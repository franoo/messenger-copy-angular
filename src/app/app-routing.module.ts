import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ChatComponent } from './chat/chat.component';
import { UserslistComponent } from './chat/userslist/userslist.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path:'login', component: LoginComponent
  },
  {
    path:'chat', component:ChatComponent, canActivate:[AuthGuard]
  },
  {path:'', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
