import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent {
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageError = false;
    } else {
      this.selectedFile = null;
      this.imageError = true;
    }
  }

  onSubmit(): void {
    if (this.addProductForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('price', this.addProductForm.get('price')?.value);
      formData.append('categoryName', this.addProductForm.get('categoryName')?.value);
      formData.append('brand', this.addProductForm.get('brand')?.value);
      formData.append('stock', this.addProductForm.get('stock')?.value);
      formData.append('detail', this.addProductForm.get('detail')?.value);
      formData.append('barcode', this.addProductForm.get('barcode')?.value);
      formData.append('imageFile', this.selectedFile!);

      this.productService.createProduct(formData).subscribe(
        () => {
          this.router.navigate(['/product-list']);
        },
        (error) => {
          console.error('Product creation failed:', error);
        }
      );
    }
  }
}
