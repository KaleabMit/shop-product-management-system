import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-receipt',
  standalone: false,
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent implements OnInit {
  tx_ref: string | null = null;
  paymentData: any = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.tx_ref = this.route.snapshot.queryParamMap.get('tx_ref');

    if (this.tx_ref) {
      this.apiService.verifyPayment(this.tx_ref).subscribe({
        next: (data) => {
          // Retrieve saved items from sessionStorage (or fallback to empty array)
          const savedItems = JSON.parse(sessionStorage.getItem('paymentItems') || '[]');

          // Merge saved items into paymentData
          this.paymentData = {
            ...data,
            items: savedItems,
            // Optional: calculate subtotal, shipping, total here if not included
            subtotal: savedItems.reduce((acc: number, item: any) => acc + item.total, 0),
            shipping: data.shipping || 0,
            total: savedItems.reduce((acc: number, item: any) => acc + item.total, 0) + (data.shipping || 0),
          };

          this.loading = false;
        },
        error: (err) => {
          this.error = 'Could not verify payment.';
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.error = 'No transaction reference found.';
      this.loading = false;
    }
  }

downloadReceipt() {
  const element = document.getElementById('invoice');
  const options = {
    margin: 0.5,
    filename: `receipt-${this.tx_ref}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true }, // ✅ ensures Cloudinary images load
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  // Temporarily hide only non-printable UI
  const nonPrintable = document.querySelector('.non-printable') as HTMLElement;
  if (nonPrintable) nonPrintable.style.display = 'none';

  html2pdf()
    .from(element)
    .set(options)
    .save()
    .then(() => {
      if (nonPrintable) nonPrintable.style.display = '';
    });
}

ngAfterViewInit() {
  const inputs = document.querySelectorAll<HTMLInputElement>('.payment-card input');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      (this as HTMLInputElement).style.borderColor = this.value.trim() ? '#28a745' : '#ccc';
    });
  });
}

}
