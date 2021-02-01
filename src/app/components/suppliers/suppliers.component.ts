import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.supplierForm = this.fb.group({
      company: '',
      contactName: '',
      phone: '',
      country: '',
      products: this.fb.array([]),
    });
  }

  get productForms() {
    return this.supplierForm.get('products') as FormArray;
  }

  addProduct() {
    const product = this.fb.group({
      productName: '',
      productPrice: '',
      productDescription: '',
    });

    this.productForms.push(product);
  }

  deleteProduct(i: number) {
    this.productForms.removeAt(i);
  }

  createNewSupplier() {
    // console.log(this.supplierForm.value);
    this.supplierService.createNewSupplier(this.supplierForm.value);
  }
}
