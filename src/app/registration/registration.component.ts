import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf, NgClass, CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
   templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [FormsModule, NgIf, RouterOutlet, NgClass,CommonModule],
})
export class RegistrationComponent {
  account = {
    email: '',
    password: '',
    role: 'USER',
    businessType: ''
  };

  constructor(private http: HttpClient, private router: Router) {}
message = '';
messageType = '';

  register() {
    const endpoint = this.account.role === 'PARTNER' ? 'partner' : 'user';
    const payload = {
      email: this.account.email,
      password: this.account.password,
      ...(this.account.role === 'PARTNER' && { businessType: this.account.businessType })
    };
  this.http.post('http://localhost:8081/api/user', {
  email: this.account.email,
  password: this.account.password,
  role: this.account.role,
  businessType: this.account.role === 'PARTNER' ? this.account.businessType : undefined
}, {
  responseType: 'text' as 'json',
  withCredentials: true


}).subscribe({
  next: () => {
     this.messageType = 'success';
     this.message = 'Registered successfully!';
     setTimeout(() => this.message = '', 3000);
    this.account = { email: '', password: '', role: 'USER',businessType:'' };
     setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  },
  error: (err) => {
      this.messageType = 'error';
      if (err.status === 409) {
        this.message = 'User already registered. Please login.';
      } else {
        this.message = 'Registration failed. Please try again.';
      }
      setTimeout(() => this.message = '', 3000);
    }

});
  }
}
