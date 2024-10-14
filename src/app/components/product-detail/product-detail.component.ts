import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addProductToCart } from '../../store/cart.actions';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  
  errorMessage: string | null = null;
  isLoading: boolean = true;
  constructor(
    private store: Store,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          if (product) {
            this.product = product;
            this.isLoading = false;
            this.errorMessage = null; // Reset error message
          } else {
            // If product is not found, redirect to 404 page
            this.router.navigate(['/404']);
          }
        },
        error: (err) => {
          // Handle the error by redirecting to 404 page
          this.router.navigate(['/404']);
        },
      });
    }
  }

  addToCart(product: Product): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.store.dispatch(addProductToCart({ product: this.product }));
      this.cartService.addToCart(product); //add and save product to localstorage;
      this.toastr.success(
        'Anyone with access can view your invited visitors.',
        'Product Added!'
      );
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { returnUrl: this.router.url },
      });
    }
  }
}
