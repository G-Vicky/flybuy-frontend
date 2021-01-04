import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductsService) {
    this.productService.getAllProducts().subscribe((result) => {
      console.log(result);
      this.products = result.data;
    });
  }

  ngOnInit(): void {}
}
