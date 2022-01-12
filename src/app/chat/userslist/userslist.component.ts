import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  constructor(private userService: UserService, private messageService:MessageService) { }

  users: User[]=[];
  selectedUser?:User;

  ngOnInit(): void {
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
  }


}
