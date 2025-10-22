import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://taskmanagementsystem-dfc4d-default-rtdb.firebaseio.com/tasks.json';

  constructor(private http: HttpClient) {}

  // Add a new task (POST)
  addTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  // Fetch all tasks (GET)
  getTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }>(this.baseUrl).pipe(
      map(responseData => {
        const tasks: Task[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            tasks.push({ ...responseData[key], id: key });
          }
        }
        return tasks;
      })
    );
  }

  // Clear all tasks (DELETE)
  clearTasks(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
