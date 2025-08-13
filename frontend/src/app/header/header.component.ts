import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit , OnDestroy {
user!: User;
  private sub$ = new Subject<void>();
  title = 'AMU - CS';
  searchTerm: string = '';

  constructor(private router: Router,
              private apiService: ApiService,
              private message: MessageService) {}

  isLoggedIn(): boolean {
    return this.apiService.isAuthenticated();
  }

  logout() {
    this.apiService.logout().subscribe(res => {
      if (res.success) {
        this.message.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Logged out',
          life: 1500
        });
        setTimeout(() => {
          this.router.navigateByUrl('/').then();
        }, 1500);
      }
    });
  }

  ngOnInit(): void {
    this.apiService.getUserObservable().pipe(
      takeUntil(this.sub$)
    ).subscribe(user => {
      this.user = user;
    });
  }
 
  onSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/post'], { queryParams: { search: this.searchTerm, scroll: 'start' } });
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }
}
