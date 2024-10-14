import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit{

  product: Product[]=[];
  constructor(private productService: ProductService){}
  ngOnInit(){
    this.productService.getProductList().subscribe((response: Product[]) => {
      this.product = response;
    });
  }
}
