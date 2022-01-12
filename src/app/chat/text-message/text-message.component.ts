import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.css']
})
export class TextMessageComponent implements OnInit {

  constructor() {}
  @Input() message:Message;
  @Input() username:string;
  
  ngOnInit(): void {
    console.log(this.message);
    //console.log(this.message.MessageContent)
  }

}
