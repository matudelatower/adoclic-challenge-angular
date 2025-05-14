import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private endpoint = 'products';

  constructor() { }

  public get(queryParams?: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.endpoint}`, { params: queryParams });
  }

  public getByCategory(category: string, queryParams?: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.endpoint}/category/${category}`, { params: queryParams });
  }

}
