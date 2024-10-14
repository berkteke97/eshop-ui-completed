import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent {
  editProductForm: FormGroup;
  selectedFile: File | null = null;
  imageError: boolean = false;
  productId: string | null = null;
  currentImageUrl: String | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService, 
    private router: Router,
   private route: ActivatedRoute) {
    this.editProductForm = this.fb.group({
      price: ['', Validators.required],
      categoryName: ['', Validators.required],
      brand: ['', Validators.required],
      stock: ['', Validators.required],
      detail: ['', Validators.required],
      barcode: ['', Validators.required]
    });
  }
    ngOnInit(): void {
     this.productId= this.route.snapshot.paramMap.get('id');

     if(this.productId){
      this.productService.getProductById(this.productId).subscribe(
        (product)=>{
          this.editProductForm.patchValue({
            price: product.price,
            categoryName: product.categoryName,
            brand: product.brand,
            stock: product.stock,
            detail: product.detail,
            barcode: product.barcode,
            
          });
         
        },
        (error)=>{
          console.error("Error fetching product:",error);
          
        }
      )
     }
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
    if (this.editProductForm.valid && this.selectedFile && this.productId) {
      const formData = new FormData();
      formData.append('price', this.editProductForm.get('price')?.value);
      formData.append('categoryName', this.editProductForm.get('categoryName')?.value);
      formData.append('brand', this.editProductForm.get('brand')?.value);
      formData.append('stock', this.editProductForm.get('stock')?.value);
      formData.append('detail', this.editProductForm.get('detail')?.value);
      formData.append('barcode', this.editProductForm.get('barcode')?.value);
      formData.append('imageFile', this.selectedFile!);

      this.productService.editProduct(formData,this.productId).subscribe(
        () => {
          this.router.navigate(['/product-list']);
        },
        (error) => {
          console.error('Product edit failed:', error);
        }
      );
    }
  }
}
