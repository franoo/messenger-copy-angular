import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserLogged} from '../models/userLogged.model';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
     
  constructor(private http: HttpClient) {
  }
  loggedUserSubject= new BehaviorSubject<UserLogged>(null as any);



  login(userLogin : UserLogin ) {
      let body={
        "username": userLogin.username,
        "password": userLogin.password
      };
      //console.log(body);
      
      return this.http.post<UserLogged>('http://localhost:5000/api/auth/login', body, { 
        headers: new HttpHeaders({
          "Content-Type": "application/json"        
        })
      }).pipe(map(response=>{
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        console.log(response);
        this.loggedUserSubject.next(response);
      }));
  }

  public get loggedInUserValue(){
    return this.loggedUserSubject.value;
  }
  public isLogged(){
    if(this.loggedUserSubject.value)
      return true;
    return false;
  }
  public logout(){
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null);
}
}
        