import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
imports: [FormsModule, NgIf]

@Component({
  selector: 'app-login',
   standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgIf, CommonModule]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
    role: 'USER'
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post< {message: string, role: string}>('http://localhost:8081/api/login', this.credentials, {
    }).subscribe({
      next: (res) => {

      console.log('Received response:', res);
      if (res.role === 'USER') {
        this.router.navigate(['/user']);
      } else if (res.role === 'PARTNER') {
        this.router.navigate(['/partner']);
      }

    },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials. Please check your credentials.');
      }
    });
  }
}
