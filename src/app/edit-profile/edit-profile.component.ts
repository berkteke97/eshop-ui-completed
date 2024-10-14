import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  customerId!: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:[''],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    // Get customer id from route params
    this.customerId = this.route.snapshot.paramMap.get('id')!;

    // Load customer data
    this.customerService.getCurrentCustomer().subscribe((customer: Customer) => {
      this.profileForm.patchValue({
        username: customer.username,
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      });
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData= this.profileForm.value;

      if(!formData.password){
        delete formData.password;
      }
      
      this.customerService.updateCustomer(this.profileForm.value).subscribe(
        (response) => {
          console.log('Profile updated successfully', response);
          this.router.navigate(['/customer-profile']);
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}

