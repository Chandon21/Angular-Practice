import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  details = '';
  tasks: Task[] = [];
  isLoading = false;

  constructor(private taskService: TaskService) {}

  // Add new task
  onAddTask() {
    if (!this.title.trim() || !this.details.trim()) return;
    const newTask: Task = { title: this.title, details: this.details };

    this.taskService.addTask(newTask).subscribe(() => {
      this.title = '';
      this.details = '';
     // this.fetchTasks(); // refresh list
    });
  }

  // Fetch tasks
  fetchTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.isLoading = false;
    });
  }

  // Clear all tasks
  onClearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
      this.taskService.clearTasks().subscribe(() => {
        this.tasks = [];
      });
    }
  }
}
