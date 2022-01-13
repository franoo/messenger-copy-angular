import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

import { MessageDTO } from 'src/app/models/messageDTO.model';
import { User } from 'src/app/models/user.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private chatService: ChatService, 
              private messageService:MessageService, 
              private authService:AuthService){ 
  }
  user: User = null;
  conversation: Message[]=[];
  yourUsername='Ty';

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { 
      if(receivedObj.senderId == this.user.id )
        this.addToInbox(receivedObj);
    }); 
    this.messageService.selectedUserData.subscribe(data=>{
        this.user=data;
        if(this.user != null){
           //this.get
                console.log(this.conversation);
          this.getMessages();
            
        }
      });
  }


  addToInbox(obj: Message) {
    this.conversation.push(obj);

  }

  private getMessages(){
    this.messageService.getMessagesFromConversation(this.user.id)
    .subscribe((data : Message[]) =>{
        this.conversation = data;
      });
  }

  setConversation(obj: Message[]){
    this.conversation = obj;
  }
  sendMessage(event : any){
    const messageDTO = new MessageDTO(this.user.id,event);
    console.log(messageDTO);
    //for sending message to DB and SignalR
    this.messageService.sendMessage(messageDTO).subscribe((data:Message) => {
      this.addToInbox(data);
    });
    //this.chatService.sendMessage(messageDTO);
  }
}
