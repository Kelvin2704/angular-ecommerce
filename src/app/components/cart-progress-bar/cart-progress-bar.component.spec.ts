import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProgressBarComponent } from './cart-progress-bar.component';

describe('CartProgressBarComponent', () => {
  let component: CartProgressBarComponent;
  let fixture: ComponentFixture<CartProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
