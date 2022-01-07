import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor() { }
  @Input() user: User;
  ngOnInit(): void {
  }

}
