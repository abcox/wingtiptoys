"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
//import { default as servicePaths } from '../services/mocks/contact-service.mock';
// NOTES:
// 1. fix injectable issue: https://stackoverflow.com/questions/51907164/experimental-support-for-decorators-visual-studio-2017
var MockCarServiceInterceptor = /** @class */ (function () {
    function MockCarServiceInterceptor() {
    }
    MockCarServiceInterceptor.prototype.intercept = function (request, next) {
        console.log('request: ', request);
        //let servicePath = servicePaths.find(obj => obj.url === request.url.split("?")[0]);
        //console.log('servicePath: ', servicePath);
        if (request.url.lastIndexOf("mock://") !== 0) {
            return next.handle(request);
        }
        else {
            //return servicePath.handler();
            console.log('Someone is mocking you!');
            var search_1 = request.params.get("search");
            var body = [
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
            if (search_1)
                body = body.filter(function (i) { return i.productName.toLowerCase().lastIndexOf(search_1) > -1 || i.description.toLowerCase().lastIndexOf(search_1) > -1; });
            console.log('body: ', body);
            return rxjs_1.of(new http_1.HttpResponse({
                status: 200, body: body
            }));
        }
    };
    MockCarServiceInterceptor = __decorate([
        core_1.Injectable()
    ], MockCarServiceInterceptor);
    return MockCarServiceInterceptor;
}());
exports.MockCarServiceInterceptor = MockCarServiceInterceptor;
//# sourceMappingURL=mock-car-service.interceptor.js.map