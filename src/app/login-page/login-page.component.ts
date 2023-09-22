import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {



  constructor(){}

  userInput:string = "";
 /*
 Set username based on user input
*/
  public setUserName(event:any){
    this.userInput = event.target.value;
  }



  login(){
    console.log(this.userInput);
  }





}
