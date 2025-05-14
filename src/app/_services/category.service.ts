import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private endpoint = 'products/categories';


  public get(): Observable<string[]> {
      return this.http.get<string[]>(`${environment.apiUrl}/${this.endpoint}`);
    }
  
}
