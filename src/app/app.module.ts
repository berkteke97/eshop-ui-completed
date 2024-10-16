import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Ekleyin

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product/product.service';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth_service/auth.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product_/edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CartService } from './cart/cart.service';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    RegisterComponent,
    CustomerProfileComponent,
    AuthComponent,
    ProductDetailComponent,
    AddProductComponent,
    EditProductComponent,
    EditProfileComponent,
    AddToCartComponent,
    MyCartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [ProductService,
    AuthService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
