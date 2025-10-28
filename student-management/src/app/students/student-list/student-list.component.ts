import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../../shared/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filter = '';

  constructor(private svc: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(s => this.students = s); // works if getAll() returns Observable
  }

  onAdd() {
    this.router.navigate(['/students/add']);
  }

  onEdit(id: number) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onDelete(id: number) {
    if (confirm('Delete this student?')) {
      this.svc.deleteStudent(+id); // convert string to number
    }
  }

  filtered(): Student[] {
    const q = this.filter.trim().toLowerCase();
    if (!q) return this.students;
    return this.students.filter(s =>
      (s.name + ' ' + s.email + ' ' + s.course).toLowerCase().includes(q)
    );
  }
}
