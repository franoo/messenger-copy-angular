import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MessageDTO } from '../models/messageDTO.model';
import { Message } from '../models/message.model';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { AuthService } from './auth.service';

//Service for processing signalR requests

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
     private  connection: any;
     readonly POST_URL = "https://localhost:5000/api/messages"
     private receivedMessageObject: Message = new Message(null,null,null,'',null);
     private sharedObj = new Subject<Message>();

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/chatsocket", {
      accessTokenFactory: () => authService.getToken(),
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })   // mapping to the chathub as in startup.cs
                                           .configureLogging(signalR.LogLevel.Information)
                                           .build();
    this.start();
    this.connection.onclose(async () => {
      console.log("connection is closed");
      await this.start();
    });
    this.connection.on("ReceiveOne", (Id: number, SenderId:number, ReceiverId:number, MessageContent:string, Date:Date) => {
      this.sharedObj.next(new Message(Id,SenderId,ReceiverId,MessageContent,Date));
    });
    //.then(()=>  this.getConnectionId());            
  }

  public async start() {
    console.log("time to connect");
    try {
      await this.connection.start();
      console.log("connected");
      this.getConnectionId();
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);}
    // this.connection.start().then(function () {
    //   console.log('SignalR Connected!');
    // }).catch(function (err :any) {
    //   console.error(err.toString());
    // });
  }

    
  public getConnectionId = () => {
    this.connection.invoke('getConnectionId').then(
      (data: any) => {
        console.log('idConection', data);
        //his.saveSocketConnection(data).subscribe(response => {
         // console.log('save socket connection works', response);
        });
  }
    
  

   // Calls the controller method
   public broadcastMessage(msgDto: MessageDTO) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public sendMessage(msg: MessageDTO){
    return this.http.post(this.POST_URL, msg);
  }

  public retrieveMappedObject(): Observable<Message> {
    return this.sharedObj.asObservable();
  }

}
