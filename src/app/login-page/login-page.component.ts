import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit{



  constructor(private router: Router ,private readonly userService: UserService){}
  

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
  //on init check if user is logged in, if so redirect to pokedex
  ngOnInit(): void {
    if(this.userService.getUser().username){
      this.router.navigate(['pokedex']);
    }
  }




}
