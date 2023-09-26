import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer-page.component.html',
})
export class TrainerPageComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  user?: User = this.userService.getUser();

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.userChange.subscribe(
      (newUser) => (this.user = newUser)
    );

    if (!this.userService.getUser()) {
      const localStorageUser = localStorage.getItem('user');
      if (localStorageUser) {
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public removePokemon(pokemonId: number): void {
    this.userService.removePokemon(pokemonId);
  }
}
