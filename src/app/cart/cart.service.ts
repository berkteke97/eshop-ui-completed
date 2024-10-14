import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cart';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
    private cartItems: any[] = []; 

  constructor(private http: HttpClient) { }
  baseUrl = environment.API_BASE_URL;

  private getAuthHeaders(): HttpHeaders {
    const currentUser = localStorage.getItem('currentUser');
    let token = "";
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      token = parsedUser.token;
      
    }
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }


 


  addToCart(cartItem: { productId: number, quantity: number }): Observable<any> {
    const headers = this.getAuthHeaders()
    const existingItem = this.cartItems.find(item => item.productId === cartItem.productId);
    
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      this.cartItems.push(cartItem);
    }
    return this.http.post(this.baseUrl +'/cart/add', { cartItems: this.cartItems },{headers});
  }

  getCart(): Observable<CartResponse> {
    const headers = this.getAuthHeaders()
    return this.http.get<CartResponse>(`${this.baseUrl}/cart`,{headers});
  }

  clearCart(): void {
    this.cartItems = [];
  }

}
