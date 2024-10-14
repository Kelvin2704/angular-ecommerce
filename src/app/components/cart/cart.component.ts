import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart.reducer';
import {
  clearCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  loadCart,
  removeProductFromCart,
} from '../../store/cart.actions';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  //modal state
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  showActions: boolean = true;
  isRemovingItems: boolean = false;
  productIdToRemove: number | null = null;

  //cart component
  selectedItems: Set<number> = new Set(); // Track selected items via their product IDs;
  totalPrice: number = 0;
  subtotal: number = 0;
  tax: number = 0;
  promoDiscount: number = 0;
  total: number = 0;
  promoCode: string = '';
  validPromoCodes: { [code: string]: number } = {
    PROMO10: 0.1,
    PROMO20: 0.2,
    PROMO30: 0.3,
  };
  promoApplied: boolean = false;

  constructor(
    private cartService: CartService,
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {}
  ngOnInit(): void {
    // dispatch action loadCart to store
    this.store.dispatch(loadCart());

    // Subscribe to store and sync cart state with component
    this.store.select('cart').subscribe((cartState) => {
      this.cartItems = cartState.items;
      this.totalPrice = cartState.total;
      // this.selectedItems.clear();
      this.calculateSummary();
    });
  }

  // Method to open the modal
  openModal(title: string, message: string, productId?: number) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
    this.isRemovingItems = true;
    this.showActions = true;
    this.productIdToRemove = productId || null;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
    this.productIdToRemove = null;
  }

  confirmDelete(productId?: number) {
    if (this.isRemovingItems && this.selectedItems.size > 0) {
      this.selectedItems.forEach((id) => {
        this.store.dispatch(removeProductFromCart({ productId: id }));
        this.cartService.removeFromCart(id);
      });
      this.selectedItems.clear();
      this.calculateSummary(); // Recalculate summary after deletion
    } else if (this.productIdToRemove !== null) {
      this.store.dispatch(
        removeProductFromCart({ productId: this.productIdToRemove })
      );
      this.cartService.removeFromCart(this.productIdToRemove);
      this.calculateSummary(); // Recalculate summary after deletion
    } else {
      alert('No items selected for removal.');
    }
    this.closeModal(); // Close the modal after confirmation
  }

  removeFromCart(productId: number): void {
    if (this.selectedItems.has(productId)) {
      this.openModal(
        `Delete ${this.selectedItems.size} selected items?`,
        'Are you sure you want to remove the selected items from the cart?',
        productId
      );
    } else {
      console.log(productId);

      this.openModal(
        'Delete item?',
        'Are you sure you want to remove this item from the cart?',
        productId
      );
    }
  }

  increaseQuantity(productId: number): void {
    this.store.dispatch(increaseProductQuantity({ productId }));
    this.cartService.increaseQuantity(productId);

    // Auto-select the item when quantity is increased
    this.selectedItems.add(productId);
    this.calculateSummary(); // Update the cart summary
  }

  decreaseQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product && product.quantity === 1) {
      this.removeFromCart(productId);
    } else {
      this.store.dispatch(decreaseProductQuantity({ productId }));
      this.cartService.decreaseQuantity(productId);
      this.selectedItems.add(productId);
    }
    this.calculateSummary();
  }

  toggleSelection(productId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedItems.add(productId);
    } else {
      this.selectedItems.delete(productId);
    }
    // console.log('cart selected items', this.selectedItems);
    this.calculateSummary();
  }

  isCheckoutAvailable(): boolean {
    return this.selectedItems.size > 0;
  }

  proceedToCheckout(): void {
    if (this.isCheckoutAvailable()) {
      const selectedProducts = this.cartItems.filter((item) =>
        this.selectedItems.has(item.id)
      );
     
      this.calculateSummary()
      const checkoutData = {
        selectedProducts,
        subtotal:this.subtotal,
        tax:this.tax,
        promoDiscount:this.promoDiscount,
        total:this.total,
      };

      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      this.router.navigate(['/checkout']);
    } else {
      this.modalMessage = 'You need to select cart items to checkout!';
      this.showModal = true;
      this.showActions = false;
      setTimeout(() => {
        this.showModal = false;
      }, 1200);
    }
  }

  calculateSummary(): void {
    this.subtotal = this.cartItems
      .filter((item) => this.selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    this.tax = this.subtotal * 0.05;
    this.promoDiscount = this.promoApplied
      ? this.subtotal * this.validPromoCodes[this.promoCode]
      : 0;

    this.total = this.subtotal + this.tax - this.promoDiscount;
  }

  applyPromoCode(): void {
    if (this.validPromoCodes[this.promoCode]) {
      this.promoApplied = true;
      this.calculateSummary();
      alert(
        `Promo code applied! You get a ${
          this.validPromoCodes[this.promoCode] * 100
        }% discount.`
      );
    } else {
      this.promoApplied = false;
      alert('Invalid promode');
    }
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.cartItems.forEach((item) => this.selectedItems.add(item.id));
    } else {
      this.selectedItems.clear();
    }

    this.calculateSummary();
  }

  clearCart(): void {
    const confirmed = confirm('Are you sure you want to clear all cart items?');

    if (confirmed) {
      this.store.dispatch(clearCart());
      this.cartService.clearCart();
      this.selectedItems.clear();
      this.calculateSummary();
    }
  }
}
