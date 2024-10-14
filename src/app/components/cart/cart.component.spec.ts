import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CartState } from '../../store/cart.reducer';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: Store<{ cart: CartState }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [StoreModule.forRoot({})],  // Provide the Store
      providers: [
        { provide: Store, useValue: { select: () => of({ items: [], total: 0 }) } }  // Mock the Store
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with cart items from the store', () => {
    component.ngOnInit();
    expect(component.cartItems.length).toBe(0);
    expect(component.totalPrice).toBe(0);
  });
});
