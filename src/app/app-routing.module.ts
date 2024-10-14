import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'search', component: SearchPageComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canDeactivate: [CheckoutGuard],
  },
  { path: 'orders', component: OrdersComponent },
  { path: 'auth', component: LoginSignupComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
