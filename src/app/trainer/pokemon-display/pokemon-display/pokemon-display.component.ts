import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
})
export class PokemonDisplayComponent implements OnInit {

  @Input() user!: User;


  constructor(private readonly userService: UserService){
    
  }


  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
    }
  }
}
