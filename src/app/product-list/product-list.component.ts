import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: Product[] = [];
  sortedProducts: Product[] = [];
  showOutOfStock: boolean = false; // Stokta olmayan ürünleri gösterme durumu

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductList().subscribe((response: Product[]) => {
      this.product = response;
      this.sortedProducts = [...this.product]; // İlk başta sıralı ürünler
    });
  }

  sortByPrice(direction: 'asc' | 'desc') {
    this.sortedProducts.sort((a, b) => {
      return direction === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }

  sortByBrand(direction: 'asc' | 'desc') {
    this.sortedProducts.sort((a, b) => {
      const brandA = a.brand.valueOf(); // String nesnesinden ilkel string'e çeviriyoruz
      const brandB = b.brand.valueOf(); // String nesnesinden ilkel string'e çeviriyoruz
      
      return direction === 'asc' ? brandA.localeCompare(brandB) : brandB.localeCompare(brandA);
    });
  }

  toggleOutOfStock() {
    this.showOutOfStock = !this.showOutOfStock; // Durumu tersine çevir
  }
}
