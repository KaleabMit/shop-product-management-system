import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../models/category.interface';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy {
category: Category[] = [];
private sub$ = new Subject<void>();
  loading = true;

  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getAllCategories().pipe(takeUntil(this.sub$)).subscribe({
      next: (category) => {
        this.category = category;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.add({
          severity: 'error',
          summary: 'Load Error',
          detail: 'Failed to load category',
          life: 3000,
        });
      },
    });
  }

  getDelay(category: Category): number {
    const index = this.category.indexOf(category);
    return 100 + (index % 4) * 100;
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }
}
