import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Response>('http://localhost:8080/auth/login', { email: email, password: password }, { observe: 'response' })
  }

  register(email: string, password: string) {
    return this.http.post<Response>('http://localhost:8080/users', { email: email, password: password }, { observe: 'response' })
  }

  forgotPassword(email: string) {
   return this.http.post<Response>('http://localhost:8080/users/resetPassword ', {email: email}, { observe: 'response' })
  }
}
