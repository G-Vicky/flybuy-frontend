import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../interfaces/product';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchProductForm: FormGroup;

  products: IProduct[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {}

  getSearchProduct() {
    var q = this.searchProductForm.get('searchProduct')?.value;

    if (q != '' || q != null) {
      this.productService.searchProducts(q).subscribe((result) => {
        console.log(result);
        this.products = result.data;
      });
    } else {
      this.getAllProducts();
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((result) => {
      console.log(result);
      this.products = result.data;
    });
  }

  ngOnInit(): void {
    this.searchProductForm = this.fb.group({
      searchProduct: '',
    });

    this.getAllProducts();
  }
}
