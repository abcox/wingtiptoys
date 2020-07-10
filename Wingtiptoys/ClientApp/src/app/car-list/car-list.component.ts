import { Component, Inject, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { fromEvent, of, Subject, Observable, pipe, timer } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from "rxjs/operators";

const productCategoryName = "Cars";
const minimumSearchTermLength = 2;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements AfterViewInit {
  public $products: Observable<Product[]>;
  searchInput$ = new Subject<string>();
  private searchField: FormControl;
  private loading: boolean = false;

  constructor (
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

    // https://codecraft.tv/courses/angular/http/http-with-observables/
    // https://medium.com/angular-in-depth/rxjs-live-search-the-devil-is-in-the-detail-119637186427
    // https://www.positronx.io/handle-angular-http-requests-with-observables/

    //this.searchField = new FormControl();

    //const onCarsLoadSuccess = matchingCars => console.log(matchingCars);

    //this.$products = this.searchField.valueChanges.pipe(

    this.$products = this.searchInput$.pipe(
      //filter(phrase => phrase.length >= 2),
      debounceTime(400),
      distinctUntilChanged(),
      tap(term => {
        this.loading = true;
        console.log('term: ', term);
      }),
      switchMap(term => this.getCars(term)),
      tap(_ => this.loading = false)
    );
  }

  search(input?: string) {
    console.log('search: ', input);
    this.searchInput$.next(input);
  }

  getCars(searchString?: string): Observable<Product[]> {
    console.log('searchString: ', searchString);
    let params = new HttpParams().set("categoryName", productCategoryName);
    if (searchString && searchString.length >= minimumSearchTermLength) {
      params = params.append("search", searchString);
    }
    return this.http.get<Product[]>(`${this.baseUrl}products`, { params });
  }

  ngAfterViewInit() {
    timer(1000).subscribe(() => { this.search("d"); console.log('1'); });
    timer(2000).subscribe(() => { this.search(" "); console.log('2'); });
    timer(3000).subscribe(() => { this.search(""); console.log('3'); });
  }

  // https://alligator.io/angular/real-time-search-angular-rxjs/
  //search(searchString$: Observable<string>) {
  //  return searchString$.pipe(
  //    debounceTime(1000),
  //    distinctUntilChanged(),
  //    switchMap(searchString => this.getCars(searchString))
  //  );
  //}

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
