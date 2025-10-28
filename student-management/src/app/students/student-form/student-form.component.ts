import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../../shared/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  student: Student = { id: 0, name: '', email: '', course: '' };
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private svc: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.svc.getById(+id);
      if (found) {
        this.student = { ...found };
        this.editMode = true;
      }
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.svc.updateStudent(this.student);
    } else {
      this.svc.addStudent(this.student);
    }
    this.router.navigate(['/students']);
  }
}
