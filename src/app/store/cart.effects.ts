import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CartService } from '../services/cart/cart.service';
import { loadCart, loadCartFailure, loadCartSuccess } from './cart.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { combineCartItems } from '../utils/cart.utils';

@Injectable()
export class CartEffects {
  private cartService = inject(CartService);
  actions$ = inject(Actions);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart), // Listen for the loadCart action
      switchMap(() =>
        this.cartService.getCartItems().pipe(
          // Fetch cart items from CartService
          map((items) => {
            const combinedItems = combineCartItems(items);
            const total = combinedItems.reduce(
              (sum, item) => sum + item.price * (item.quantity || 1),
              0
            );

            return loadCartSuccess({ items: combinedItems, total });
          }), // Dispatch success action with items and total
          catchError((error) =>
            of(loadCartFailure({ error: 'Failed to load cart' }))
          ) // Handle errors
        )
      )
    )
  );
}
