import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

import { MessageDTO } from 'src/app/models/messageDTO.model';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private chatService: ChatService, private messageService:MessageService){ 
  }
  user: User = null;
  conversation: Message[]=[];
  yourUsername='Ty';

  ngOnInit(): void {
 
    //this.messageService.getMessagesFromConversation(this.user.id).subscribe(data => this.setConversation(data));
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { this.addToInbox(receivedObj);}); 
    this.messageService.selectedUserData.subscribe(data=>{
        this.user=data;
        if(this.user != null){
            this.messageService.getMessagesFromConversation(this.user.id)
            .subscribe((data : Message[]) =>{
                this.conversation = data;
                console.log(this.conversation);

            })
        }
      });
  }


  addToInbox(obj: Message) {
    this.conversation.push(obj);
  }

  setConversation(obj: Message[]){
    this.conversation = obj;
  }
  sendMessage(event : any){
    const messageDTO = new MessageDTO(this.user.id,event);
    console.log(messageDTO);
    this.messageService.sendMessage(messageDTO);
  }
}
