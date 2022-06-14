import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../task";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tasks-preview',
  templateUrl: './tasks-preview.component.html',
  styleUrls: ['./tasks-preview.component.scss']
})
export class TasksPreviewComponent implements OnInit {

  tasks?: Task[];
  currentTask?: Task;
  currentIndex = -1;
  title = '';
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.retrieveTutorials();
  }
  refreshList(): void {
    this.currentTask = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    console.log(this.taskService.getAll());
  }
  setActiveTutorial(tutorial: Task, index: number): void {
    this.currentTask = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.taskService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
