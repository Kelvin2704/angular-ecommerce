import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { CheckoutComponent } from '../components/checkout/checkout.component'; // Path to your component
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanDeactivate<CheckoutComponent> {
  // Implementing the CanDeactivate method
  canDeactivate(
    component: CheckoutComponent,
    currentRoute: any,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    if (component.orderCompleted) {
      return true;
    }

    const isNavigatingToOrders = nextState.url.includes('/orders');
    isNavigatingToOrders && true;
    if (component.selectedProducts.length > 0) {
      // Call the component's method to show the confirmation modal
      return component.showExitConfirmationModal();
    }

    return true;
  }
}
