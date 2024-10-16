import { Component } from "@angular/core";
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
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

  removeItem(productId: string): void { // productId string olarak tanımlandı
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.getCartItems(); // Sepeti güncelle
      },
      error: (err) => {
        this.errorMessage = 'Error removing item from cart';
        console.error(err);
      }
    });
  }  
}
