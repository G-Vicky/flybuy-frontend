import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css'],
})
export class StockOrdersComponent implements OnInit {
  searchProductForm: FormGroup;
  productStockForm: FormGroup;
  searchProducts: IProduct[] = [];

  selectProduct: any[] = [];

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) {}

  getSearchProduct() {
    var q = this.searchProductForm.get('searchProduct')?.value;

    if (q != '' || q != null) {
      this.supplierService.searchProducts(q).subscribe((result) => {
        // console.log(result.data);
        this.searchProducts = result.data;
        console.log(this.searchProducts);
      });
    }
  }

  get productForms() {
    return this.productStockForm.get('products') as FormArray;
  }

  addProduct() {
    const product = this.fb.group({
      productName: '',
      productPrice: '',
      productDescription: '',
      quantity: '60',
    });

    this.productForms.push(product);
  }

  deleteProduct(i: number) {
    this.productForms.removeAt(i);
  }

  ngOnInit() {
    this.searchProductForm = this.fb.group({
      searchProduct: '',
    });

    this.productStockForm = this.fb.group({
      products: this.fb.array([]),
    });
  }
}
