import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeProductFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);

export const loadCart = createAction('[Cart] Load Cart from Storage');
export const clearCart = createAction('[Cart] Clear Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: Product[]; total: number }>()
);

// Load cart failure action
export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const updateCartItemCount = createAction(
  '[Cart] Update Cart Item Count',
  props<{ count: number }>()
);

export const increaseProductQuantity = createAction(
  '[Cart] Increase Product Quantity',
  props<{ productId: number }>()
);

export const decreaseProductQuantity = createAction(
  '[Cart] Decrease Product Quantity',
  props<{ productId: number }>()
  
);

