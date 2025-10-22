import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    TaskAddComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule, // Provides ngIf, ngFor, etc.
    FormsModule   // Needed for [(ngModel)] in forms
  ],
  exports: [
    TaskAddComponent,
    TaskListComponent
  ]
})
export class TasksModule { }
