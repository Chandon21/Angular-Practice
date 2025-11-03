import { Injectable } from '@angular/core';
import { Student } from '../shared/models/student.model';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] =  [
  { id: 1, name: 'Alice', email: 'alice@gmail.com', department: 'CS', course: 'Angular', skills: ['HTML', 'CSS'] },
  { id: 2, name: 'Bob', email: 'bob@gmail.com', department: 'IT', course: 'React', skills: ['JavaScript'] },
  { id: 3, name: 'Chandan', email: 'chandan@gmail.com', department: 'CS', course: 'Angular', skills: ['TypeScript'] },
  { id: 4, name: 'Atique', email: 'atique@gmail.com', department: 'IT', course: 'React', skills: ['JavaScript', 'CSS'] },
  { id: 5, name: 'Ashik', email: 'ashik@gmail.com', department: 'CS', course: 'Angular', skills: ['HTML', 'Angular'] },
  { id: 6, name: 'Robin', email: 'robin@gmail.com', department: 'IT', course: 'Vue', skills: ['JavaScript'] },
  { id: 7, name: 'Fuad', email: 'fuad@gmail.com', department: 'CS', course: 'Angular', skills: ['TypeScript', 'CSS'] },
  { id: 8, name: 'Soumik', email: 'soumik@gmail.com', department: 'IT', course: 'React', skills: ['HTML', 'JavaScript'] },
  { id: 9, name: 'John', email: 'john@gmail.com', department: 'CS', course: 'Angular', skills: ['HTML'] },
  { id: 10, name: 'Mary', email: 'mary@gmail.com', department: 'IT', course: 'Vue', skills: ['JavaScript', 'CSS'] }
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
    student.id = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
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
