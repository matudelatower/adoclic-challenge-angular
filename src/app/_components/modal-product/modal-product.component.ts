import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../_models/product.model';

@Component({
  selector: 'app-modal-product',
  imports: [],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.scss'
})
export class ModalProductComponent {
  activeModal = inject(NgbActiveModal);
  @Input() product!: Product;
}
