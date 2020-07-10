import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { timer } from "rxjs";

import { CarListComponent } from './car-list.component';
import { MockCarServiceInterceptor } from '../mocks/mock-car-service.interceptor';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CarListComponent],
      providers: [
        { provide: 'BASE_URL', useFactory: () => 'mock://', deps: [] },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockCarServiceInterceptor,
          multi: true
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // https://github.com/angular/angular/blob/master/packages/forms/test/template_integration_spec.ts#L29

  it('searching "1" should bring back 5 items', async () => {
    component.getCars("1").subscribe(results => expect(results.length).toEqual(5));
  });

  it('searching "car" should bring back 4 items', async () => {
    component.getCars("car").subscribe(results => expect(results.length).toEqual(4));
  });

  it('searching "fa" should bring back 3 items', async () => {
    component.getCars("fa").subscribe(results => expect(results.length).toEqual(3));
  });

  it('searching "old" should bring back 2 items', async () => {
    component.getCars("old").subscribe(results => expect(results.length).toEqual(2));
  });

  it('searching "wa" should bring back 1 item', async () => {
    component.getCars("wa").subscribe(results => expect(results.length).toEqual(1));
  });

  it('searching "zz" should bring back 0 items', async () => {
    component.getCars("zz").subscribe(results => expect(results.length).toEqual(0));
  });

});
