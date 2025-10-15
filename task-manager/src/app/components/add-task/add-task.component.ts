import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
  taskName = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: this.taskName,
        completed: false
      };
      this.taskService.addTask(newTask);
      this.taskName = '';
      alert('Task added!');
    }
  }
}
