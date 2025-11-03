import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../../shared/models/student.model';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  editMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private svc: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.studentForm = this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        department: ['']
      }),
      course: ['', Validators.required],
      skills: this.fb.array([])
    });

    // Load student if editing
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;
      const student = this.svc.getById(this.studentId);
      if (student) {
        this.studentForm.patchValue({
          personal: {
            name: student.name,
            email: student.email,
            department: student.department || ''
          },
          course: student.course
        });

        // Load skills
        if (student.skills) {
          (student.skills as string[]).forEach((skill: string) => this.addSkill(skill));
        }

        this.editMode = true;
      }
    }
  }

  // FormArray accessor
  get skills(): FormArray {
    return this.studentForm.get('skills') as FormArray;
  }

  // Add a skill
  addSkill(skill: string = ''): void {
    this.skills.push(this.fb.control(skill, Validators.required));
  }

  // Remove a skill
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Custom validator: roll must be numeric
  rollValidator(): ValidatorFn {
    return (control: AbstractControl) => /^\d+$/.test(control.value) ? null : { invalidRoll: true };
  }

  // Submit form
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const personal = this.studentForm.get('personal')?.value;
    const student: Student = {
      id: this.studentId || 0,
      name: personal.name,
      email: personal.email,
      department: personal.department,
      course: this.studentForm.value.course,
      skills: this.studentForm.value.skills
    };

    if (this.editMode) this.svc.updateStudent(student);
    else this.svc.addStudent(student);

    this.router.navigate(['/students']);
  }

  // Cancel button
  cancel(): void {
    this.router.navigate(['/students']);
  }

  // 🔹 Reset the form
  resetForm(): void {
    this.studentForm.reset();
    while (this.skills.length) this.skills.removeAt(0);
  }

  // 🔹 Fill form with example data
  setFormExample(): void {
    this.studentForm.patchValue({
      personal: {
        name: 'John Doe',
        email: 'john@example.com',
        department: 'CS',
        roll: '101'
      },
      course: 'Angular'
    });

    // Clear existing skills
    while (this.skills.length) this.skills.removeAt(0);

    // Add example skills
    this.addSkill('HTML');
    this.addSkill('CSS');
    this.addSkill('TypeScript');
  }
}
