import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from "rxjs";
//import { default as servicePaths } from '../services/mocks/contact-service.mock';

// NOTES:
// 1. fix injectable issue: https://stackoverflow.com/questions/51907164/experimental-support-for-decorators-visual-studio-2017

@Injectable()
export class MockCarServiceInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request: ', request);
    //let servicePath = servicePaths.find(obj => obj.url === request.url.split("?")[0]);
    //console.log('servicePath: ', servicePath);
    if (request.url.lastIndexOf("mock://") !== 0) {
      return next.handle(request);
    } else {
      //return servicePath.handler();
      console.log('Someone is mocking you!');
      let search = request.params.get("search");
      let body = [
        {
          "productId": 1,
          "productName": "Convertible Car",
          "description": "This convertible car is fast! The engine is powered by a neutrino based battery (not included).Power it up and let it go!",
          "imagePath": "carconvert.png",
          "unitPrice": 22.5,
          "categoryId": 1,
        },
        {
          "productId": 2,
          "productName": "Old-time Car",
          "description": "There's nothing old about this toy car, except it's looks. Compatible with other old toy cars.",
          "imagePath": "carearly.png",
          "unitPrice": 15.95,
          "categoryId": 1,
        },
        {
          "productId": 3,
          "productName": "Fast Car",
          "description": "Yes this car is fast, but it also floats in water.",
          "imagePath": "carfast.png",
          "unitPrice": 32.99,
          "categoryId": 1,
        },
        {
          "productId": 4,
          "productName": "Super Fast Car",
          "description": "Use this super fast car to entertain guests. Lights and doors work!",
          "imagePath": "carfaster.png",
          "unitPrice": 8.95,
          "categoryId": 1,
        },
        {
          "productId": 5,
          "productName": "Old Style Racer",
          "description": "This old style racer can fly (with user assistance). Gravity controls flight duration.No batteries required.",
          "imagePath": "carracer.png",
          "unitPrice": 34.95,
          "categoryId": 1,
        }
      ];
      if (search) body = body.filter(i => i.productName.toLowerCase().lastIndexOf(search) > -1 || i.description.toLowerCase().lastIndexOf(search) > -1);
      console.log('body: ', body);
      return of(new HttpResponse({
        status: 200, body
      }));
    }
  }
}
