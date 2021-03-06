import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  onLogout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
