import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product.model';
import { addProductToCart } from '../../store/cart.actions';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let storeSpy: { dispatch: jasmine.Spy };

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [{ provide: Store, useValue: storeSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      title: 'Chair',
      price: 50,
      description: 'A comfortable chair',
      image: '',
      category: 'Furniture'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addProductToCart action when Add to Cart is clicked', () => {
    const addButton = fixture.debugElement.query(By.css('button')).nativeElement;
    addButton.click();
    
    expect(storeSpy.dispatch).toHaveBeenCalledWith(addProductToCart({ product: component.product }));
  });
});
