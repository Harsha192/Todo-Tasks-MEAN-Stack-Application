const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");

const index = require("./routes/index");
const tasks = require("./routes/tasks");

const app = express();
const port = process.env.PORT || 8080;

//use cors mw
const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.engine("html", require("ejs").renderFile);

//set static folder
// app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "public")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

//body parser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/", index);
app.use("/api", tasks);

app.listen(port, function() {
  console.log(`server started in port ${port}.`);
});
