import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../Task"
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task?: Task;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTask: Task = {
    title: '',
    description: '',
    published: false
  };
  message = '';
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentTask = { ...this.task };
  }
  updatePublished(status: boolean): void {
    if (this.currentTask.key) {
      this.taskService.update(this.currentTask.key, { published: status })
        .then(() => {
          this.currentTask.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateTutorial(): void {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description
    };
    if (this.currentTask.key) {
      this.taskService.update(this.currentTask.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }
  deleteTutorial(): void {
    if (this.currentTask.key) {
      this.taskService.delete(this.currentTask.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
