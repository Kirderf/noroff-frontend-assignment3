import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {



  constructor(private readonly userService: UserService){}
  

  userInput:string = "";
 /*
 Set username based on user input
*/
  public setUserName(event:any){
    this.userInput = event.target.value;
  }

  login(){
    this.userService.login(this.userInput);
  }





}
