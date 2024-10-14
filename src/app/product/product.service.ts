import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  createProduct(productData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    // Do not set the 'Content-Type' manually here, FormData manages it
    return this.http.post(`http://localhost:8092/product/addProduct`, productData, { headers });
  }

  getProductList(): Observable<Product[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product[]>(`http://localhost:8092/product`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching product list', error);
        return of([]);  // Return an empty array in case of error
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product>(`${this.baseUrl}/product/${id}`,{headers});
  }

  deleteProductByBarcode(barcode: string | undefined): Observable<any>{
    const headers= this.getAuthHeaders();
    
     return this.http.delete<Product>(`${this.baseUrl}/product/deleteProduct/${barcode}`,{headers});
  }

  editProduct(product: FormData,id:string):  Observable<Product>{
    const headers = this.getAuthHeaders();
    return this.http.put<Product>(`${this.baseUrl}/product/updateProduct/${id}`,product,{headers});
  
      
    }

  getProductRecommendations(productId: string): Observable<Product[]>{
    const headers= this.getAuthHeaders();
    return this.http.get<Product[]>(`${this.baseUrl}/product/${productId}/recommendations`,{headers})
  }  

  addToCart(productId: number, quantity: number): Observable<any> {
    const headers= this.getAuthHeaders();
    const cartItem = { productId, quantity };
    return this.http.post(`${this.baseUrl}/cart/add`, cartItem,{headers});

}
}
