import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../task";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CrudTaskComponent} from "../crud-task/crud-task.component";

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
  constructor(private taskService: TaskService,
              private dialog: MatDialog) {}
  ngOnInit(): void {
    this.retrieveTutorials();
  }
  refreshList(): void {
    this.currentTask = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      console.log(tasks)
    })
  }
  setActiveTutorial(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.taskService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  openTask(task?, index?) {
    const dialogRef = this.dialog.open(CrudTaskComponent, {
      width: '400px',
      height: '300px',
      data: {task, index},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
      // this.animal = result;
    });
  }
}
