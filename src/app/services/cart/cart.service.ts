import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { loadCart } from '../../store/cart.actions';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { updateCartItems } from '../../utils/cart.utils';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = ''; //locale storage key
  private cartItems: Product[] = [];

  constructor(private store: Store) {
    this.setCartKey();
    this.loadCartFromLocalStorage();
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private setCartKey(): void {
    if (!this.isBrowser()) return;
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    );
    if (currentUser && currentUser.email) {
      this.cartKey = `cart_${currentUser.email}`;
    } else {
      this.cartKey = 'guest_cart';
    }
  }



  addToCart(product: Product): void {
    this.cartItems = updateCartItems(product, this.cartItems);
    this.saveCartToLocalStorage();
  }

  clearCart():void{
    this.cartItems = [];
    this.saveCartToLocalStorage()
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  // Method to increase product quantity
  increaseQuantity(productId: number): void {
    this.cartItems = this.cartItems.map((item) => {
      if (item.id === productId) {
        // Return a new product object with updated quantity
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });

    this.saveCartToLocalStorage(); // Save the updated cart to localStorage
  }

  // Method to decrease product quantity and remove product if quantity is 0
  decreaseQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      product.quantity = (product.quantity || 1) - 1; // Decrease the quantity
      if (product.quantity <= 0) {
        this.removeFromCart(productId); // Remove product if quantity reaches 0
      } else {
        this.saveCartToLocalStorage(); // Otherwise, save updated cart
      }
    }
  }

  getCartItems(): Observable<Product[]> {
    this.setCartKey();
    const storedCart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    return of(storedCart);
  }

  getTotalPrice(): Observable<number> {
    const total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    return of(total); // Return as an Observable
  }

  private saveCartToLocalStorage(): void {
    if (this.isBrowser()) {
      this.setCartKey();
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromLocalStorage(): void {
    if (this.isBrowser()) {
      this.setCartKey();
      const storedCart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
      this.cartItems = storedCart;
      this.store.dispatch(loadCart());
    }
  }

  // Sync cart items with the NgRx store
}
