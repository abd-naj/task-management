import { Component, OnInit } from '@angular/core';
import {SubdomainsService} from "../subdomains.service";
import {Subdomain} from "../subdomains";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CrudSubdomainsComponent} from "../crud-subdomains/crud-subdomains.component";

@Component({
  selector: 'app-subdomains',
  templateUrl: './subdomains-preview.component.html',
  styleUrls: ['./subdomains-preview.component.scss']
})
export class SubdomainsPreviewComponent implements OnInit {

  tasks?: Subdomain[];
  currentTask?: Subdomain;
  currentIndex = -1;
  title = '';
  constructor(private taskService: SubdomainsService,
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
  setActiveTutorial(task: Subdomain, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.taskService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  openTask(task?, index?) {
    const dialogRef = this.dialog.open(CrudSubdomainsComponent, {
      width: '500px',
      height: '456px',
      data: {task, index},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
      // this.animal = result;
    });
  }
}
