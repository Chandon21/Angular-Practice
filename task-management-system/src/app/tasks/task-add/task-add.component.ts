import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html'
})
export class TaskAddComponent {
  taskName: string = '';
  taskStatus: string = 'Pending';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.taskName.trim()) return;

    const newTask: Task = { id: 0, name: this.taskName, status: this.taskStatus };

    this.taskService.addTask(newTask).subscribe({
      next: (task) => {
        alert('Task added!');
        this.taskName = '';
        this.taskStatus = 'Pending';
        // optional: emit an event to reload task list if using parent-child
      },
      error: err => console.error('Failed to add task', err)
    });
  }
}
