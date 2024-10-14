import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  ngOnInit(): void {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      this.orders = JSON.parse(storedOrders);
    }
  }
  // Helper method to format credit card information
  obfuscateCard(cardNumber: string): string {
    return cardNumber ? cardNumber.replace(/.(?=.{4})/g, '*') : '';
  }

  // Helper method to format date from ISO string
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
