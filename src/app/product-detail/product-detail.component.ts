import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { AuthService } from '../auth_service/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  imageSrc: string | undefined;
  products: Product[] = [];
  productRecommendations: Product[] = [];  
  recommendedProductImages: { [productId: string]: string } = {};
  showBuyNowFormm: boolean = false;
  quantity: number = 1;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  openBuyNowForm() {
    this.showBuyNowFormm = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe(
          data => {
            this.product = data;
            if (this.product.imageUrl) {
              
              this.imageSrc = this.convertImageToBase64(this.product.imageUrl);
            }

            
            this.loadRecommendations(id);
     
            this.isAdmin = this.authService.hasRole('ADMIN');
            console.log("IsAdmin: ",this.isAdmin);
            
            

            
          },
          error => {
            console.error('Failed to load product details:', error);
          }
        );
      }
    });
  }

  incrementQuantity(): void
    {
        if(this.quantity < this.product!.stock){
          this.quantity++;
        }

    }  

    decrementQuantity(): void
    {
        if(this.quantity < this.product!.stock){
          this.quantity--;
        }

    }    




convertImageToBase64(image: any): string {
    return 'data:image/jpeg;base64,' + image;  // Convert image to base64
  }


  deleteProduct(barcode: string | undefined): void {
    if (!barcode) {
      console.error('Barcode is undefined, cannot delete product');
      return;
    }

    this.productService.deleteProductByBarcode(barcode).subscribe(
      () => {
        this.products = this.products.filter(product => product.barcode !== barcode);
        console.log('Product deleted successfully');
      },
      error => {
        console.error('Failed to delete the product:', error);
      }
    );   
  }

  // Fetch recommendations
  loadRecommendations(productId: string): void {
    this.productService.getProductRecommendations(productId).subscribe(
      (recommendations: Product[]) => {
        this.productRecommendations = recommendations;
        if( this.productRecommendations.length> 0){
          this.recommendedProductImages = {};
          this.productRecommendations.forEach(product => {
            if (product.imageUrl) {
              this.recommendedProductImages[product.id] = this.convertImageToBase64(product.imageUrl);
              
            }
          });
        }
      },
      error => {
        console.error('Failed to load recommendations:', error);
      }
    );
  }

  addToCart() {
    
      this.productService.addToCart(this.product!.id, this.quantity).subscribe(
        (response) => {
          this.successMessage = 'Product added to cart successfully!';
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = 'Error adding product to cart: ' + error.message;
          this.successMessage = null;
        }
      );
    
}
}