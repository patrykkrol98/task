import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(FormGroupDirective) form: any;
  @Output() tabChange = new EventEmitter<number>();
  registerForm: FormGroup;
  passwordStrength: number = 0;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
        confirmPassword: ['', [Validators.required,]]
      }, {
      validator: this.controlValuesAreEqual('password', 'confirmPassword')
    }
    )
  }

  ngOnInit(): void { this.onChanges() }

  onChanges(): void {
    this.registerForm.get('password')?.valueChanges.subscribe((password: string) => {
      this.passwordStrength = 0
      if (/.*[a-z].*$/.test(password)) {
        this.passwordStrength = this.passwordStrength + 25
      }
      if (/.*[A-Z].*$/.test(password)) {
        this.passwordStrength = this.passwordStrength + 25
      }
      if (/.*[0-9].*$/.test(password)) {
        this.passwordStrength = this.passwordStrength + 25
      }
      if (/.{8,}$/.test(password)) {
        this.passwordStrength = this.passwordStrength + 25
      }
    })
  }

  submit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password

      let authObservable: Observable<any>;

      authObservable = this.authService.register(email, password)

      authObservable.subscribe(res => {
        this.tabChange.emit(0)
      });
      this.form.resetForm();
    }
  }

  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const valueOfControlA = formGroup.get(controlNameA)?.value
      const valueOfControlB = formGroup.get(controlNameB)?.value
      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        this.registerForm.get(controlNameB)?.setErrors({ valuesDoNotMatch: true })
        return { valuesDoNotMatch: true }
      }
    }
  }
}
