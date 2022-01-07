import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 
  
  constructor( private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
  }

  onFormSubmit(): void {
    console.log('Name:' + this.loginForm.get('name')?.valueChanges);
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    var user = new UserLogin(username, password );
    this.authService.login(user).pipe(first()).subscribe(
      data=>{
        console.log(data);
    });
  }

}
