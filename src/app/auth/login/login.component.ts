import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormGroupDirective) form: any;
  @Output() forgotPasswordFlag = new EventEmitter<boolean>();

  loginForm: FormGroup;
  loginState!: number;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
  }

  toForgotPassword() {
    this.forgotPasswordFlag.emit(true);
  }

  submit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      let authObservable: Observable<any>;

      authObservable = this.authService.login(email, password)

      authObservable.subscribe({
        next: (response: Response) => {
          this.loginState = response.status
        },
        error: (error: HttpErrorResponse) => {
          this.loginState = error.status
        }
      })
      this.form.resetForm();
    }
  }
}
