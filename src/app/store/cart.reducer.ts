import { createReducer, on } from '@ngrx/store';
import {
  addProductToCart,
  clearCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  removeProductFromCart,
  updateCartItemCount,
} from './cart.actions';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart/cart.service';
import { updateCartItems } from '../utils/cart.utils';

export interface CartState {
  items: Product[];
  total: number;
  itemCount: number;
  error: string | null;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  totalQuantity: 0,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state, { product }) => {
    // const existingProduct = state.items.find((item) => item.id === product.id);
    // let updatedItems;
    // if (existingProduct) {
    //   updatedItems = state.items.map((item) =>
    //     item.id === product.id
    //       ? { ...item, quantity: (item.quantity || 1) + 1 }
    //       : item
    //   );
    // } else {
    //   updatedItems = [...state.items, { ...product, quantity: 1 }];
    // }
    // const updatedItems = [...state.items, { ...product }];

    const updatedItems = updateCartItems(product, state.items);
    const total = updatedItems.reduce(
      (sum: number, item: Product) => sum + item.price * (item.quantity || 1),
      0
    );
    const totalQuantity = updatedItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: total,
      totalQuantity: totalQuantity,
    };
  }),

  on(loadCart, (state) => {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    );
    const cartKey = currentUser ? `cart_${currentUser.email}` : 'guest_cart';
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const total = storedCart.reduce(
      (sum: number, item: Product) => sum + item.price,
      0
    );
    return {
      ...state,
      items: storedCart,
      total: total,
      error: null,
    };
  }),

  on(loadCartSuccess, (state, { items, total }) => {
    const totalQuantity = items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    return {
      ...state,
      items: items,
      total: total,
      totalQuantity: totalQuantity,
      itemCount: items.length,
      error: null,
    };
  }),

  on(loadCartFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(removeProductFromCart, (state, { productId }) => {
    //filter out the product being moved
    const updatedItems = state.items.filter((item) => item.id !== productId);
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const updatedTotalQuantity = updatedItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: updatedTotal,
      totalQuantity: updatedTotalQuantity,
    };
  }),

  on(increaseProductQuantity, (state, { productId }) => {
    const updatedItems = state.items.map((item) =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const updatedTotalQuantity = updatedItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    return {
      ...state,
      items: updatedItems,
      total: updatedTotal,
      totalQuantity: updatedTotalQuantity,
    };
  }),

  on(decreaseProductQuantity, (state, { productId }) => {
    const updatedItems = state.items
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      // Remove the item if quantity is 0
      .filter((item) => item.quantity || 0 > 0);

    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const updatedTotalQuantity = updatedItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: updatedTotal,
      totalQuantity: updatedTotalQuantity,
    };
  }),

  on(updateCartItemCount, (state, { count }) => ({
    ...state,
    itemCount: count,
  })),

  on(clearCart, (state) => ({
    ...state,
    items: [],
    total: 0,
    totalQuantity: 0,
  }))
);
