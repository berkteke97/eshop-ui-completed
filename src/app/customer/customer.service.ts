import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  createCustomer(customer: Customer){ 
    return this.http.post(this.baseUrl+"/api/register", customer);
  }

  getCurrentCustomer(){
    const headers= this.getAuthHeaders()
    return this.http.get<Customer>(this.baseUrl+ "/account/current",{headers})
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const headers= this.getAuthHeaders()
    return this.http.post<Customer>(`${this.baseUrl}/account/updateCustomer`, customer,{headers});
  }

}
