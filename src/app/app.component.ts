import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './services/product/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAuthRoute:boolean = false;
  isCheckout:boolean = false;
  isCart:boolean = false;
  products: Product[] = [];
  constructor(private productService: ProductService,private router:Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event:NavigationEnd)=>{
      this.isAuthRoute = event.url.includes('/auth');
      this.isCheckout = event.url.includes('/checkout')
      this.isCart = event.url.includes('/cart')
    })
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      // console.log('Products fetch from api', this.products);
    });
  }
}
