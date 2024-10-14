import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/product.actions';
import { Observable } from 'rxjs';
import { ProductState } from '../../store/product.reducer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  cartItems = [];
  products$: Observable<Product[]>;
  constructor(
    private store: Store<{ products: ProductState }>,
  ) {
    this.products$ = this.store.select((state) => state.products.products);
  }
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
