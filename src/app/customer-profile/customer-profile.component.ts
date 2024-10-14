import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCurrentCustomer().subscribe(
      (data: Customer) => {
        this.customer = data;
      },
      (error) => {
        console.error("Error fetching customer profile:", error);
      }
    );
  }
}
