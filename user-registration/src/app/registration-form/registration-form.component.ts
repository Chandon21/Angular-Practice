import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormArray, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Strict email validator
export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(control.value) ? null : { strictEmail: true };
}

// Async username validator
export function usernameAsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const forbiddenUsernames = ['admin', 'test', 'user'];
    return of(forbiddenUsernames.includes(control.value)).pipe(
      delay(1000),
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  };
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;
  submittedData: any;
  formSubmitted = false;
  phoneSaved: boolean[] = []; // Track saved phones

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userData: this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)], [usernameAsyncValidator()]],
        email: ['', [Validators.required, strictEmailValidator]]
      }),
      gender: ['male'],
      country: ['bangladesh'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agree: [false, Validators.requiredTrue],
      phones: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')])
      ])
    });

    this.phoneSaved = this.phones.controls.map(() => false);

    this.registrationForm.valueChanges.subscribe(val => console.log('Value Changed:', val));
    this.registrationForm.statusChanges.subscribe(status => console.log('Status Changed:', status));
  }

  get phones() {
    return this.registrationForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]));
    this.phoneSaved.push(false);
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
    this.phoneSaved.splice(index, 1);
  }

  savePhone(index: number) {
    const phoneControl = this.phones.at(index);
    if (phoneControl.valid) {
      this.phoneSaved[index] = true;
      console.log(`Phone number saved: ${phoneControl.value}`);
      setTimeout(() => this.phoneSaved[index] = false, 2000);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markAllControlsAsTouched(this.registrationForm);

    if (this.registrationForm.valid) {
      this.submittedData = this.registrationForm.value;
      console.log('Form Submitted:', this.submittedData);
      this.registrationForm.reset({ gender: 'male', country: 'bangladesh', phones: [''] });
      this.phoneSaved = [false];
      this.formSubmitted = false;
    }
  }

  patchCountry() {
    this.registrationForm.patchValue({ country: 'india', userData: { email: 'example@domain.com' } });
  }

  private markAllControlsAsTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllControlsAsTouched(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
