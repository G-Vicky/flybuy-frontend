import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISupplier } from '../interfaces/supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly URL = 'http://localhost:3000/suppliers';
  constructor(private http: HttpClient) {}

  createNewSupplier(newSupplier: ISupplier) {
    console.log('Creating new Supplier', newSupplier);
    this.http
      .post(this.URL, newSupplier)
      .subscribe((data) => console.log(data));
  }

  searchProducts(q: string): Observable<any> {
    return this.http.get(this.URL + '/products');
  }
}
