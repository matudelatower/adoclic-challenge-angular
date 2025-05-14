import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComponent } from './shopping.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingComponent, 
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
