import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly URL = 'http://flybuy36.herokuapp.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    console.log('Request is sent!');

    return this.http.get(this.URL);
  }
}
