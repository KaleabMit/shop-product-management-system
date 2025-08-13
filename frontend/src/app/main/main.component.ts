import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
 user!: User; 
  private sub$ = new Subject<void>();
  constructor(private router: Router,
    private apiService:ApiService,
    private message: MessageService,
    private route:ActivatedRoute) {}

    title='Teleport - Homes';
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
          setTimeout(()=>{
            this.router.navigateByUrl('/').then();
          },1500);
   
         }
       });
     }
     ngOnInit(): void { 
       this.apiService.getUserObservable().pipe( 
         takeUntil(this.sub$) ).subscribe(
           user => { this.user = user; }); 
         } 
         ngOnDestroy(): void { 
           this.sub$.next(); 
           this.sub$.complete();
         }
}
