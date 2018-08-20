import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TaskService} from '../shared/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  _id: string = '';
  title: string = '';
  isDone : boolean = false;
  // selectedTask:{_id:string, title:string, isDone:boolean} = {_id:'', title:'', isDone:false};
  constructor(private taskService: TaskService, private toastr: ToastrService, public ngProgress: NgProgress) { }
  tasks;
  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.ngProgress.start();
    this.taskService.getTasks()
    .subscribe(tasks =>{
      this.tasks = [];
      this.tasks = tasks;
      this.ngProgress.done();
      console.log(this.tasks);
    })
  }

  onSubmit(form: NgForm){
    console.log(this.isDone);
    if(this._id){
      var selectedTask = {
        title: form.value.title,
        isDone: this.isDone
      }
      this.taskService.updateTask(this._id, selectedTask)
      .subscribe(data =>{
        this.getTasks();
        this.toastr.success('Task Updated Successfully.', 'Update Task');
        // form.reset();
        // this._id = '';
        // this.title='';
        // this.isDone=false;
        this.resetForm(form);
        console.log(this.isDone);
      })
    }else{
      console.log(this.isDone);
      var newTask = {
        title: form.value.title,
        isDone: this.isDone
      }
      console.log(JSON.stringify(newTask));
      this.taskService.addTask(newTask)
      .subscribe(data =>{
        this.getTasks();
        this.toastr.success('Task Added Successfully.', 'Add Task');
        // form.reset();
        // this._id = '';
        // this.title='';
        // this.isDone=false;
        this.resetForm(form);
      })
    }
    // this._id='';
    // this.selectedTask = {_id:'', title:'', isDone:false};    
  }

  resetForm(form?: NgForm){
    if(form!=null){
      form.reset();
    }
    this._id = '';
    this.title='';
    this.isDone=false;
  }

  editTask(task){   
    this._id = task._id;
    this.title = task.title;
    this.isDone = task.isDone;
    console.log(task.isDone);
    // this.selectedTask = {
    //   _id: task._id,
    //   title: task.title,
    //   isDone: task.isDone
    // };
  }

  deleteTaskDetail;
  getDeleteTask(task){
    this.deleteTaskDetail = task;
  }
  deleteTask(){
    let task = this.deleteTaskDetail;
    this.taskService.deleteTask(task)
    .subscribe(data =>{
      this.getTasks();
      this.toastr.warning('Task Deleted Successfully.','Delete Task');
      this.deleteTaskDetail = '';
    })
  }

  onCheckBoxChange(task){
    console.log(task);
    var selectedTask = {
      title: task.title,
      isDone: !task.isDone
    }

    this.taskService.updateTask(task._id, selectedTask)
    .subscribe(data=>{
      console.log(data);
      this.getTasks();
    })
  }
}
