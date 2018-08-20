import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private http: Http) {}

  getTasks() {
    return this.http
      .get("http://localhost:8080/api/tasks")
      .map(res => res.json());
  }

  addTask(task) {
    console.log(task);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:8080/api/task", JSON.stringify(task), {
        headers: headers
      })
      .map(res => res.json());
  }

  updateTask(_id, task) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:8080/api/task/" + _id, JSON.stringify(task), {
        headers: headers
      })
      .map(res => res.json());
  }

  deleteTask(task) {
    return this.http
      .delete("http://localhost:8080/api/task/" + task._id)
      .map(res => res.json());
  }
}
