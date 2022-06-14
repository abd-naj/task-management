import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-crud-task',
  templateUrl: './crud-task.component.html',
  styleUrls: ['./crud-task.component.scss']
})
export class CrudTaskComponent implements OnInit {
  task: Task = new Task();
  submitted = false;
  constructor(private tutorialService: TaskService) { }
  ngOnInit(): void {
  }
  saveTutorial(): void {
    this.tutorialService.create(this.task)
  }
  newTutorial(): void {
    this.submitted = false;
    this.task = new Task();
  }


}
