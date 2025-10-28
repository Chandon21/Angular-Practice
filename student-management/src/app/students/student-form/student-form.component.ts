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
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;
      const student = this.svc.getById(this.studentId);
      if (student) {
        // Demonstrate patchValue
        this.studentForm.patchValue({
          personal: {
            name: student.name,
            email: student.email,
            department: student.department || '',
         
          },
          course: student.course
        });

        // Populate skills dynamically
        if (student.skills) {
          student.skills.forEach(skill => this.addSkill(skill));
        }
        this.editMode = true;
      }
    }
  }

  initForm() {
    this.studentForm = this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        department: [''],
       
      }),
      course: ['', Validators.required],
      skills: this.fb.array([])
    });
  }

  get skills(): FormArray {
    return this.studentForm.get('skills') as FormArray;
  }

  addSkill(skill = '') {
    this.skills.push(this.fb.control(skill, Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  rollValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { invalidRoll: true };
    };
  }

  onSubmit() {
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

    if (this.editMode) {
      this.svc.updateStudent(student);
    } else {
      this.svc.addStudent(student);
    }

    // Demonstrate reset after submit
    this.studentForm.reset();
    this.router.navigate(['/students']);
  }

  cancel() {
    this.router.navigate(['/students']);
  }

  resetForm() {
    // Full reset example
    this.studentForm.reset({
      personal: {
        name: '',
        email: '',
        department: '',
      
      },
      course: '',
      skills: []
    });
  }

  setFormExample() {
    // Demonstrate setValue (full form)
    this.studentForm.setValue({
      personal: { name: 'John', email: 'john@test.com', department: 'CSE',  },
      course: 'Angular',
      skills: ['HTML', 'CSS']
    });
  }
}
