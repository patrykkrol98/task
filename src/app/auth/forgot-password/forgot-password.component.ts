import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.css', './forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Output() forgotPasswordFlag = new EventEmitter<boolean>();
  emailControl: FormControl;
  emailState!: number;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.emailControl = new FormControl('', [Validators.required, Validators.email])
  }

  ngOnInit(): void { }

  submit() {
    if (this.emailControl.valid) {
      let authObservable: Observable<any>;
      authObservable = this.authService.forgotPassword(this.emailControl.value)

      authObservable.subscribe({
        next: (response: Response) => {
          console.log(response.status)
          this.emailState = response.status;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status)
          this.emailState = error.status
        }
      })
    }
  }

  backToLogin() {
    this.forgotPasswordFlag.emit(false);
  }
}
