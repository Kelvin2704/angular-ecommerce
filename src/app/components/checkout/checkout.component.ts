import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from '../../services/cart/cart.service';
import { removeProductFromCart } from '../../store/cart.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  selectedProducts: Product[] = [];
  total: number = 0;
  tax: number = 0;
  promoDiscount: number = 0;

  email: string = '';
  selectedPaymentMethod: string = '';
  creditCard = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    nameOnCard: '',
  };

  shippingAddress = {
    company: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  };

  orderCompleted: boolean = false;
  showModal: boolean = false;
  confirmText: string = '';
  private modalObserver: any;

  constructor(
    private router: Router,
    private store: Store,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const storedCheckoutData = localStorage.getItem('checkoutData');
    if (storedCheckoutData) {
      const checkoutData = JSON.parse(storedCheckoutData);
      this.selectedProducts = checkoutData.selectedProducts || [];
      this.tax = checkoutData.tax || 0;
      this.promoDiscount = checkoutData.promoDiscount || 0;
      this.total = checkoutData.total || 0;
    }
    console.log(this.selectedProducts);
  }

  validateForm(): boolean {
    if (!this.email || !this.validateEmail(this.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method.');
      return false;
    }
    if (this.selectedPaymentMethod === 'creditCard') {
      if (
        !this.creditCard.cardNumber ||
        !this.creditCard.expirationDate ||
        !this.creditCard.cvv ||
        !this.creditCard.nameOnCard
      ) {
        alert('Please fill in all credit card details.');
        return false;
      }
    }
    if (
      !this.shippingAddress.address ||
      !this.shippingAddress.city ||
      !this.shippingAddress.state ||
      !this.shippingAddress.postalCode
    ) {
      alert('Please complete all shipping address fields.');
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(String(email).toLowerCase());
  }

  showExitConfirmationModal(): boolean | Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.showModal = true; // Show the modal when navigating away
      this.modalObserver = observer;
    });
  }

  clearCheckoutData() {
    localStorage.removeItem('checkoutData');
  }

  confirmExit(): void {
    this.clearCheckoutData(); // Clear local storage
    this.modalObserver.next(true); // Notify that the exit is confirmed
    this.modalObserver.complete(); // Close the observer
    this.showModal = false; // Close the modal
    this.router.navigate(['/cart']); // Navigate to the cart page
  }

  cancelExit(): void {
    this.modalObserver.next(false); // Notify that the exit is cancelled
    this.modalObserver.complete(); // Close the observer
    this.showModal = false; // Close the modal
  }



  confirmOrder() {
    if(!this.validateForm()) return 
    this.orderCompleted = true;
    const orderData = {
      email: this.email,
      selectedProducts: this.selectedProducts,
      total: this.total,
      tax: this.tax,
      promoDiscount: this.promoDiscount,
      paymentMethod: this.selectedPaymentMethod,
      creditCard: this.selectedPaymentMethod === 'creditCard' ? this.creditCard : null,
      shippingAddress: this.shippingAddress,
      orderDate: new Date().toISOString(),
    };
    
    this.selectedProducts.forEach((product) => {
      this.store.dispatch(removeProductFromCart({ productId: product.id }));
      this.cartService.removeFromCart(product.id);
    });

    // Save order to localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    storedOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    localStorage.removeItem('checkoutData');
    alert('Payment successful! Redirecting to order summary...');
    this.router.navigate(['/orders']);
  }
}
