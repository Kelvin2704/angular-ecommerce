import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products'

  constructor() {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
  getProductsByCategory(category:string):Observable<Product[]>{
    const encodedCategory = encodeURIComponent(category);
    return this.http.get<Product[]>(`${this.apiUrl}/category/${encodedCategory}`)
  }
}
