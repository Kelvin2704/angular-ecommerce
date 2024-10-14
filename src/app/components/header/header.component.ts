import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart.reducer';
import { Router } from '@angular/router';
import { clearCart, loadCart } from '../../store/cart.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    // Set isLoggedIn to true if user is logged in
    this.isLoggedIn = !!currentUser;

    //whenever cart's item lenght in store is changed, header will listen and change follow it
    this.store.dispatch(loadCart());
    this.store.select('cart').subscribe((cartState) => {
      this.cartItemCount = cartState.totalQuantity;
    });
  }
  searchCategory(category: string): void {
    this.router.navigate(['/search'], { queryParams: { keyword: category } });
  }
  logOut(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedProducts')
    this.store.dispatch(clearCart());
    this.router.navigate(['/auth']);
  }
}
