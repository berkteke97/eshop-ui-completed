import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product/product.service";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CartResponse } from "../models/cart-response";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.css"]
})
export class MyCartComponent {
  cart: CartResponse | null = null;
  errorMessage: string = '';
  imageSrc: string | null = null;


  constructor( private cartService: CartService) {}

  

  ngOnInit(): void {
    this.getCartItems();
  }

  // Fetch the cart items from the backend
  getCartItems(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        // Convert image to base64 for each item
        
        if (data.items) {
          data.items.forEach(item => {
            item.imageFile = this.convertImageToBase64(item.imageFile);
          });
        }
        this.cart = data;
      },
      error: (err) => {
        this.errorMessage = 'Error retrieving cart items';
        console.error(err);
      }
    });
  }
  


  convertImageToBase64(image: any): string {
    return 'data:image/jpeg;base64,' + image;  
  }
  
}
