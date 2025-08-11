import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  standalone: false,
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent implements OnInit{
  status: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.status = this.route.snapshot.queryParamMap.get('status') || 'unknown';
  }
}
