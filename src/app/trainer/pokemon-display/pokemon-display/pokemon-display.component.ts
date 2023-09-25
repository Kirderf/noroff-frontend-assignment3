import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.models';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
})
export class PokemonDisplayComponent implements OnInit {
  userSub?: Subscription;
  user?: User = this.userService.getUser();

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe(
      (newUser) => (this.user = newUser)
    );

    if (!this.userService.getUser()) {
      const localStorageUser = localStorage.getItem('user');
      if (localStorageUser) {
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }
  }
}
