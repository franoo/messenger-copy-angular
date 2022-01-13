import { Component, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  constructor(private userService: UserService, private messageService:MessageService, 
    private chatService:ChatService) { }

  users: User[]=[];
  selectedUser?:User;

  ngOnInit(): void {

    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { 
        if(receivedObj.senderId != this.selectedUser.id){
          var index = this.users.findIndex(obj=> obj.id ===receivedObj.senderId);
          this.users[index].hasNewMessage=true;
        }
    });

    this.userService.getUsers().subscribe(
      (data:User[])=>{
        console.log(data);
        this.users = data;
      }
    )
  }
  onUserSelected(user:User){
    this.messageService.newUserSelected(user);
    this.selectedUser = user;

    var index = this.users.findIndex(obj=> obj.id === user.id);
    this.users[index].hasNewMessage=false;
  }


}
