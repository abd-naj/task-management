import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TasksPreviewComponent } from './tasks-preview/tasks-preview.component';
import { CrudTaskComponent } from './crud-task/crud-task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'TasksPreview', pathMatch: 'full' },
  { path: 'TasksPreview', component: TasksPreviewComponent },
  { path: 'Task', component: CrudTaskComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    TasksPreviewComponent,
    CrudTaskComponent,
  ],
  exports: [
    TasksPreviewComponent,
    CrudTaskComponent
  ]
})
export class TaskModule { }
