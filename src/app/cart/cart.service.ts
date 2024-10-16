import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
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
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/cart/add`, cartItem, { headers });
  }

  getCart(): Observable<CartResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<CartResponse>(`${this.baseUrl}/cart`, { headers });
  }

  // Sepetten ürün kaldırma fonksiyonu
  removeFromCart(productId: string): Observable<any> { // productId string olarak tanımlandı
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/cart/remove/${productId}`, { headers });
  }
  

  clearCart(): void {
    // Bu metodu kullanmaktan vazgeçebilirsiniz. Backend ile senkronize olduğunuz için gerek yok.
  }
}
