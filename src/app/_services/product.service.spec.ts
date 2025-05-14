import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../_models/product.model';
import { environment } from '../../environments/environment';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    }
  ];

  const mockProdcutsElectronics: Product[] = [
    {
      "id": 9,
      "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      "price": 64,
      "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return at least one product with get()', () => {
    service.get().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get products by category', () => {
    const category = 'electronics';

    service.getByCategory(category).subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products.every(p => p.category === category)).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/category/${category}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProdcutsElectronics);
  });
});
