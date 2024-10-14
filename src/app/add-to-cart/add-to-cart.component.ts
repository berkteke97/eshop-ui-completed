import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.css"]
})
export class AddToCartComponent {
  addProductForm: FormGroup;
  selectedFile: File | null = null;
  imageError: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.addProductForm = this.fb.group({
      price: ['', Validators.required],
      categoryName: ['', Validators.required],
      brand: ['', Validators.required],
      stock: ['', Validators.required],
      detail: ['', Validators.required],
      barcode: ['', Validators.required]
    });
  }


    
}
