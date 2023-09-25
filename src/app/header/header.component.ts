import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit   {


  private user?: User

  constructor(private userService: UserService){

  }


 


  ngOnInit() {

    

    const user = this.userService.getUser();
    if(user){
      this.user = user;
    }
  }

  logOut(){
    this.userService.logOut();
  }



}
