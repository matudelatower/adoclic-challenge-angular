import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductComponent } from './modal-product.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalProductComponent', () => {
  let component: ModalProductComponent;
  let fixture: ComponentFixture<ModalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalProductComponent,
      ],
      providers: [
        NgbActiveModal
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalProductComponent);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      title: 'test',
      price: 10.00,
      description: 'test text',
      category: 'electronics',
      image: ''
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
