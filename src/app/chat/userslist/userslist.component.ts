import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[]=[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data:User[])=>{
        console.log(data);
        this.users = data;
      }
    )
  }

}
