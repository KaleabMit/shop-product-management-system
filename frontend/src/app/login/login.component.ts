import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private apiService:ApiService,
    private message:MessageService,
    private router:Router
) { }

ngOnInit(): void {
}

userLogin(login: NgForm) {
  if (login.invalid) {
    return;
  }
  const loginData = { email: login.value.email, password: login.value.password };

  this.apiService.login(loginData.email, loginData.password).subscribe(
    (res) => {
      if (res.success) {
        const userRole = res.user.roles;

        this.apiService.setUser(res.user);
        this.message.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Authentication Successful',
          life: 1000
        });
        setTimeout(() => {
          if (userRole === 'Reader') {
            this.router.navigateByUrl('/').then(); 
          } else if (['Admin', 'Moderator', 'BookProvider'].includes(userRole)) {
            window.location.href = 'http://localhost:4300'; 
          } else {
            this.message.add({
              severity: 'error',
              summary: 'Access Denied',
              detail: 'You are not authorized to view this page.',
              life: 1000
            });
          }
        }, 1000);
        
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid credentials.',
          life: 1000
        });
      }
    },
    (err: HttpErrorResponse) => {
      this.message.add({
        severity: 'error',
        summary: `Failed ${err.status}`,
        detail: `${err.statusText}`,
        life: 1000
      });
    }
  );
}

}
