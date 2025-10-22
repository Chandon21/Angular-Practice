// src/app/tasks/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'] // ensure this file exists
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => this.tasks = data ?? [],
      error: (err) => console.error('Failed to load tasks', err)
    });
  }

  deleteTask(id?: number): void {
    if (!id) {
      console.warn('Task ID is missing, cannot delete');
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log(`Task with ID ${id} deleted successfully`);
        this.loadTasks(); // refresh the list
      },
      error: (err) => console.error('Failed to delete task', err)
    });
  }
}


