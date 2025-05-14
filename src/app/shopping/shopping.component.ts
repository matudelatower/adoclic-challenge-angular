import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from '../_components/modal-product/modal-product.component';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product.model';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-shopping',
  imports: [
    MatTableModule,
    FormsModule
  ],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {
  private modalService = inject(NgbModal);

  private router = inject(Router);
  private authService = inject(AuthService);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];

  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'action'];

  filters = {
    limit: 10
  };

  itemsPerPage = [5, 10, 15, 20];
  categories: string[] = ['All'];

  limit: number = 10;
  category: string = 'All';

  ngOnInit() {

    this.categoryService.get().subscribe({
      next: (response) => {
        this.categories = this.categories.concat(response);
      },
      error: (error) => {
        console.error('error getting categories: ', error);
      }
    })


    this.getProducts(this.filters);
  }

  changeCategory($event: any) {
    let category = $event.target.value;
    if (category == 'All') {
      this.getProducts(this.filters);
      return;
    }

    this.getProductsByCategory(category, this.filters);


  }


  changeLimit($event: any) {
    this.filters.limit = $event.target.value

    this.getProducts(this.filters);
  }

  getProductsByCategory(category: string, filters?: any) {
    this.productService.getByCategory(category, filters).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('error obteniendo los productos');
      }
    });
  }

  getProducts(filters?: any) {
    this.productService.get(filters).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('error obteniendo los productos');
      }
    });
  }


  open(element: Product) {
    console.log('element', element);
    const modalRef = this.modalService.open(ModalProductComponent, { centered: true });
    modalRef.componentInstance.product = element;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
