//module
import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrConfig, ToastrModule } from 'ngx-toastr';

//components
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { cartReducer } from './store/cart.reducer';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

//store
import { productReducer } from './store/product.reducer';
import { ProductEffects } from './store/product.effects';
import { CartEffects } from './store/cart.effects';
import { ModalComponent } from './components/modal/modal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartProgressBarComponent } from './components/cart-progress-bar/cart-progress-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    CartComponent,
    ProductListComponent,
    HeaderComponent,
    ProductDetailComponent,
    NotFoundComponent,
    SearchPageComponent,
    LoginSignupComponent,
    ModalComponent,
    CheckoutComponent,
    OrdersComponent,
    CartProgressBarComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ cart: cartReducer, products: productReducer }, {}),
    EffectsModule.forRoot([ProductEffects, CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true,
      timeOut:3000,
      preventDuplicates:true,
      closeButton:true,
    }),
    
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {
}
