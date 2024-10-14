import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer = new Customer();
  showAlert = false;
  constructor(private customerService: CustomerService,private router: Router) { }

  public showPassword: boolean = false;

  ngOnInit() {
  }

  closeAlert() {
    this.showAlert = false;
  }
  saveCustomer() {
    this.customerService.createCustomer(this.customer).subscribe((response) => {
      console.log(response);
      this.showAlert = true;
      this.customer = new Customer();
      this.customer.activeOrder = true;
      this.router.navigate(['/auth']);
    });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  } 

}
