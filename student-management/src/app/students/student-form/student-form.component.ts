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
    private formBuilder: FormBuilder,          
    private route: ActivatedRoute,
    private studentService: StudentService,     
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({   
      personal: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        department: ['']
      }),
      course: ['', Validators.required],
      skills: this.formBuilder.array([])          
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;
      const student = this.studentService.getById(this.studentId)
      if (student) {
        this.studentForm.patchValue({
          personal: {
            name: student.name,
            email: student.email,
            department: student.department || ''
          },
          course: student.course
        });

        if (student.skills) {
          (student.skills as string[]).forEach(skill => this.addSkill(skill));
        }

        this.editMode = true;
      }
    }
  }

  get skills(): FormArray {
    return this.studentForm.get('skills') as FormArray;
  }

  addSkill(skill: string = ''): void {
    this.skills.push(this.formBuilder.control(skill, Validators.required)); 
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  rollValidator(): ValidatorFn {
    return (control: AbstractControl) => /^\d+$/.test(control.value) ? null : { invalidRoll: true };
  }

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

    if (this.editMode) this.studentService.updateStudent(student);  
    else this.studentService.addStudent(student);                   

    this.router.navigate(['/students']);
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }

  resetForm(): void {
    this.studentForm.reset();
    while (this.skills.length) this.skills.removeAt(0);
  }

  setFormExample(): void {
    this.studentForm.patchValue({
      personal: {
        name: 'John Doe',
        email: 'john@example.com',
        department: 'CS',
      },
      course: 'Angular'
    });

    while (this.skills.length) this.skills.removeAt(0);
    this.addSkill('HTML');
    this.addSkill('CSS');
    this.addSkill('TypeScript');
  }
}
