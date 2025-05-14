import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';


describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockCategories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    service.get().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });
});
