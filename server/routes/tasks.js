const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
const db = mongojs(
  "mongodb://<username>:<password>@ds219532.mlab.com:19532/task-list",
  ["task"]
);

router.get("/tasks", function(request, response, next) {
  db.task.find(function(err, docs) {
    if (err) {
      response.send(err);
    } else {
      response.send(docs);
    }
  });
});

router.get("/task/:id", function(request, response, next) {
  db.task.findOne({ _id: mongojs.ObjectId(request.params.id) }, function(
    err,
    doc
  ) {
    if (err) {
      response.send(err);
    } else {
      if (!doc) {
        response.status(404).send("Not Found.");
      } else {
        response.send(doc);
      }
    }
  });
});

router.post("/task", function(request, response, next) {
  const task = request.body;
  console.log(task);
  const scheme = {
    title: Joi.string().required(),
    isDone: Joi.boolean().required()
  };
  const result = Joi.validate(task, scheme);
  console.log(result);
  if (result.error) {
    response.send(result.error.details[0].message);
  } else {
    db.task.save(task, (err, doc) => {
      if (err) {
        response.send(err);
      } else {
        response.send(doc);
      }
    });
  }

  // if(task.title=='' || !(task.isDone == '')){
  //     response.status(400);
  //     response.json({
  //         "error" : "Bad Data"
  //     })
  // }else{
  //     db.task.save(task, function(err, task){
  //         if(err){
  //             response.send(err);
  //         }else{
  //             response.json(task);
  //         }
  //     })
  // }
});

router.delete("/task/:id", function(request, response, next) {
  db.task.findOne({ _id: mongojs.ObjectId(request.params.id) }, (err, doc) => {
    if (err) {
      response.send(err);
    } else {
      if (!doc) {
        response.status(404).send("Not Found.");
      } else {
        db.task.remove({ _id: mongojs.ObjectId(request.params.id) }, function(
          err,
          task
        ) {
          if (err) {
            response.send(err);
          } else {
            response.json(task);
          }
        });
      }
    }
  });
});

router.put("/task/:id", function(request, response, next) {
  const taskData = request.body;

  const scheme = {
    title: Joi.string().required(),
    isDone: Joi.boolean().required()
  };
  const result = Joi.validate(taskData, scheme);

  if (result.error) {
    response.send(result.error.details[0].message);
  } else {
    db.task.findOne(
      { _id: mongojs.ObjectId(request.params.id) },
      (err, doc1) => {
        if (err) {
          response.send(err);
        } else {
          if (!doc1) {
            response.status(404).send("Not Found.");
          } else {
            db.task.update(
              { _id: mongojs.ObjectId(request.params.id) },
              taskData,
              (err2, doc2) => {
                if (err2) {
                  response.send(err2);
                } else {
                  response.send(doc2);
                }
              }
            );
          }
        }
      }
    );
  }

  // const updatedTask = {};
  // if(task.title){
  //     updatedTask.title = task.title;
  // }
  // if(task.isDone){
  //     updatedTask.isDone = task.isDone;
  // }
  // if(!updatedTask){
  //     response.status(400);
  //     response.json({"error": "Bad Data"});
  // }else{
  //     db.task.update({_id: mongojs.ObjectId(request.params.id)}, updatedTask, {}, function(err, task){
  //     if(err){
  //         response.send(err);
  //     }else{
  //         response.json(task);
  //     }
  // })
  // }
});

module.exports = router;
