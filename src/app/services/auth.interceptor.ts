import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

   //let loggedInUser = this.authService.loggedInUserValue;
   // let token = JSON.parse(localStorage.getItem('token'));
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if(loggedInUser){
      let token = loggedInUser.jwtToken;
      console.log(token);
      if (token) {
          request = request.clone({ 
            headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }

    return next.handle(request);
  }
}
