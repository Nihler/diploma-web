import { Component } from '@angular/core';
import { AuthService } from '../../common/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-refresher';
  username: string;
  isLoggedin: boolean;

  constructor(private authService: AuthService){
    if(authService.userValue) {
    this.username = authService.userValue.username;
    this.isLoggedin = true;
    } else {
      this.username = "gościu";
      this.isLoggedin = false;
    }
  }

  logout(): void{
    console.log("logout");
    this.username = "gościu";
    this.isLoggedin = false;
    this.authService.logout();
  }

}
