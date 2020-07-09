import { Component, Inject, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements AfterViewInit {
  public products: Product[];
  @ViewChild('search', { static: true }) search: ElementRef;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.http.get<Product[]>(this.baseUrl + `products?categoryName=Cars`).subscribe(result => {
      this.products = result;
    }, error => {
      console.error(error)
    });
  }

  ngAfterViewInit() {

    // on keyup event of search input
    fromEvent(this.search.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater than 2
      // do not do this here, rather make minimum search string length a determiner of whether we are searching or not (bringing all items)...
      //, filter(res => res.length > 2)

      // more about hystersis and why debounce: https://my.eng.utah.edu/~cs5780/debouncing.pdf
      , debounceTime(1000)

      // filter for actual change; therefore, filter any inputs that are the same as the last
      , distinctUntilChanged()

      // subscribe to the response
    ).subscribe((search: string) => {
      let searchParam = search.length < 2 ? '' : `&search=${search}`;
      this.http.get<Product[]>(this.baseUrl + `products?categoryName=Cars${searchParam}`).subscribe(result => {
        this.products = result;
      }, error => {
        console.error(error)
      });
    });
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
