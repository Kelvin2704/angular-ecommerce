import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product/product.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store/product.reducer';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  // products: Product[] = [];
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]> =of([]);
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<{ products: ProductState }>
  ) {
    this.products$ = this.store.select((state) => state.products.products);
  }

  ngOnInit(): void {
  
    this.filteredProducts$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        const keyword = params.get('keyword');
        return this.products$.pipe(
          map((products) =>
            products.filter((product) =>
              product.category
                .toLowerCase()
                .includes(keyword?.toLowerCase() || '')
            )
          )
        );
      })
    );
  }
  // fetchProducts(category: string): void {
  //   this.isLoading = true;
  //   this.productService.getProductsByCategory(category).subscribe(
  //     (data) => {
  //       this.products = data;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Failed to fetch products', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }
}
