import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserslistComponent } from './chat/userslist/userslist.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ChatComponent } from './chat/chat.component';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { UserInfoComponent } from './chat/userinfo/userinfo.component';
import { TextMessageComponent } from './chat/text-message/text-message.component';
import { TextInputComponent } from './chat/text-input/text-input.component';
import { LogoutComponent } from './authentication/logout/logout.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserslistComponent,
    ChatComponent,
    ConversationComponent,
    UserInfoComponent,
    TextMessageComponent,
    TextInputComponent,
    LogoutComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
