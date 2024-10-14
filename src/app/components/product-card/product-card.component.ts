import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addProductToCart } from '../../store/cart.actions';
// import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  isLoading: boolean = true;
  constructor(private route: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    console.log(this.product);
  }
  goToProductDetail(): void {
    this.route.navigate(['/product', this.product.id]);
  }
}
