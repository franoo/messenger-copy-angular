import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  constructor() { }

  @Output() sendMessageEvent = new EventEmitter<string>();
  ngOnInit(): void {
  }

  onMessageSend(message:string){
    if(message!=''){
      this.sendMessageEvent.emit(message);
    }
  }

}
