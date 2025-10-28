import { Injectable } from '@angular/core';
import { Student } from '../shared/models/student.model';
//import { Student } from 'src/app/shared/models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Alice', email: 'alice@gmail.com', course: 'Angular' },
    { id: 2, name: 'Bob', email: 'bob@gmail.com', course: 'React' }
  ];

  private studentSubject = new BehaviorSubject<Student[]>(this.students);

  constructor() {}

  getAll(): Observable<Student[]> {
    return this.studentSubject.asObservable();
  }

  getById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  addStudent(student: Student): void {
    student.id = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    this.students.push(student);
    this.studentSubject.next(this.students);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.studentSubject.next(this.students);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.studentSubject.next(this.students);
  }
}
