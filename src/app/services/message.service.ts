import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';
import { MessageDTO } from '../models/messageDTO.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, authService: AuthService) { }

  private selectedUser = new BehaviorSubject<User>(null); 
  selectedUserData = this.selectedUser.asObservable();

  // private messagesSubject = new BehaviorSubject<Message>(null);
  // messagesData = this.messagesSubject.asObservable();

  getMessagesFromConversation(id: number): Observable<Message[]>{
    return this.http.get<Message[]>('http://localhost:5000/api/messages/'+id);
  }

  newUserSelected(user:User){
    this.selectedUser.next(user);
  }

  sendMessage(message:MessageDTO){; 
    return this.http.post<Message>('http://localhost:5000/api/messages', {      ReceiverId:message.ReceiverId,
     MessageContent:message.MessageContent});
  }

}
