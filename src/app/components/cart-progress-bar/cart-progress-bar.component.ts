import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cart-progress-bar',
  templateUrl: './cart-progress-bar.component.html',
  styleUrl: './cart-progress-bar.component.css'
})
export class CartProgressBarComponent {
  currentStep: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateStepFromRoute(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateStepFromRoute(event.url);
      }
    });
    console.log(this.currentStep)
  }

  updateStepFromRoute(url: string): void {
    if (url.includes('/cart')) {
      this.currentStep = 1;
    } else if (url.includes('/checkout')) {
      this.currentStep = 2;
    } else if (url.includes('/orders')) {
      this.currentStep = 3;
    }
  }
}
