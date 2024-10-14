import { createReducer,on } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailure } from './product.actions';
import { Product } from '../models/product.model';

export interface ProductState {
  products: Product[];
  error: any;
}

const initialState: ProductState = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => ({
      ...state,
      products: [...products], // Store fetched products in the state
      error: null,
    })),
    on(loadProductsFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  );
