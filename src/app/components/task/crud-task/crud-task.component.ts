import {Component, Inject, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GetOptionsService} from "../../../task-shared/get-options.service";
import {User} from "../../auth/user";

@Component({
  selector: 'app-crud-task',
  templateUrl: './crud-task.component.html',
  styleUrls: ['./crud-task.component.scss']
})
export class CrudTaskComponent implements OnInit {
  task: Task;
  submitted = false;
  message = '';
  users: User[] = [];
  options: any;
  constructor(private taskService: TaskService,
              private getOptionsService: GetOptionsService,
              public dialogRef: MatDialogRef<CrudTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.task = this.data.task ? this.data.task : new Task();
    getOptionsService.getOptions(['users', 'tasks', 'status']).subscribe((x) => {
      this.options = x;
      console.log(x);
    });
  }
  ngOnInit(): void {
    this.message = '';
  }
  saveTutorial(): void {
    this.taskService.create(this.task).then(x => {
      this.submitted = true;
      // this.dialogRef.close()
    });
  }
  newTutorial(): void {
    this.submitted = false;
    this.task = new Task();
  }
  updatePublished(status: boolean): void {
    console.log(this.task)
    if (this.task.id) {
      this.taskService.update(this.task.id, { published: status })
        .then(() => {
          this.task.published = status;
          this.message = 'The status was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  updateTutorial(): void {
    const data = {
      title: this.task.title,
      description: this.task.description,
    };
    if (this.task.id) {
      this.taskService.update(this.task.id, this.task)
        .then(() => {
          this.message = 'The tutorial was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  deleteTutorial(): void {
    if (this.task.id) {
      this.taskService.delete(this.task.id)
        .then(() => {
          this.message = 'The tutorial was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  compareFn(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

}
