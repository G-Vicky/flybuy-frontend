import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // private readonly URL = 'http://flybuy36.herokuapp.com/products';
  private readonly URL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    console.log('Request is sent!');

    return this.http.get(this.URL);
  }

  searchProducts(q: string): Observable<any> {
    console.log('Request is sent!');

    return this.http.get(this.URL + '?q=' + q);
  }
}
