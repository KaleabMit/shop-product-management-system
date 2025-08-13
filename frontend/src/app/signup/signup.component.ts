import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
constructor(
    private apiService: ApiService,
    private message: MessageService,
    private router: Router
  ) {}

  onSubmit(signupForm: NgForm) {
    
    if (signupForm.invalid) {
      this.message.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill out all required fields correctly.',
        life: 2000 
      });
      return; 
    }

    const userData = signupForm.value;

    this.apiService.registerUser(userData).subscribe(
      (res) => {
        this.message.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Account Created Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/login').then();
        }, 1000);
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
