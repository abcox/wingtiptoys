import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html'
})
export class CarListComponent {
  public products: Product[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'products?categoryName=Cars').subscribe(result => {
      console.log(result);
      this.products = result;
    }, error => console.error(error));
  }
}
export interface Product {
  productId: number;
  productName: string;
  description: string;
  imagePath: string;
  unitPrice: number | null;
  categoryId: number | null;
  categoryName: string;
}
