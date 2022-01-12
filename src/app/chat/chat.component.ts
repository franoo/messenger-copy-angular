import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  selectedUser: User;
  ngOnInit(): void {
  }

  selectUser(user:User){
    
  }

}
