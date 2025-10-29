import { Injectable } from '@angular/core';
import { Student } from '../shared/models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Chandan', email: 'chandan@gmail.com', department: 'CSE',  course: 'Angular', skills: ['HTML','CSS','JavaScript','TypeScript'] },
    { id: 2, name: 'Soumik', email: 'soumik@gmail.com', department: 'ECE', course: 'React', skills: ['JS','React'] },
    { id: 3, name: 'Robin', email: 'robin@gmail.com', department: 'IT', course: 'Node.js', skills: ['JavaScript', 'Express', 'MongoDB'] },
    { id: 4, name: 'Ashique', email: 'ashique@gmail.com', department: 'CSE', course: 'Python', skills: ['Python', 'Django', 'SQL'] },
    { id: 5, name: 'Fuad', email: 'fuad@gmail.com', department: 'EEE', course: 'Vue.js', skills: ['HTML', 'Vue', 'Tailwind'] },
    { id: 6, name: 'Sajib', email: 'sajib@gmail.com', department: 'ME', course: 'Java', skills: ['Java', 'Spring Boot'] },
    { id: 7, name: 'Atique', email: 'atique@gmail.com', department: 'CIVIL', course: 'UI/UX', skills: ['Figma', 'Photoshop', 'Wireframing'] },
    { id: 8, name: 'Sumit', email: 'sumit@gmail.com', department: 'CSE', course: 'Next.js', skills: ['React', 'Next.js', 'TypeScript'] }
]
  

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
