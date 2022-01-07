import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
    
  usersList = new BehaviorSubject<User>(null as any);
    
  getUsers(){
    return this.http.get<User[]>('http://localhost:5000/api/users/');
  }
  
}
