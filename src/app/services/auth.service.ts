import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user.model';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
     
  constructor(private http: HttpClient) {
  }
  loggedUserSubject= new BehaviorSubject<User>(null as any);



  login(userLogin : UserLogin ) {
      let body={
        "username": userLogin.username,
        "password": userLogin.password
      };
      console.log(body);
      
      return this.http.post<User>('http://localhost:5000/api/auth/login', body, { 
        headers: new HttpHeaders({
          "Content-Type": "application/json"        
        })
      }).pipe(map(response=>{
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        this.loggedUserSubject.next(response);
      }));
  }

  public get loggedInUserValue(){
    return this.loggedUserSubject.value;
  }
  public logout(){
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null);
}
}
        