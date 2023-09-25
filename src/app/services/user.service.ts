import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.models';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;
  userChange = new Subject<User>();

  httpOptions = {
    headers: new HttpHeaders({ 'X-API-KEY': environment.apiKey }),
  };

  constructor(private readonly http: HttpClient, private router: Router) {
    this.userChange.subscribe((user: User) => {
      if (user.username) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public setUser(user: User) {
    this.user = user;
    this.userChange.next(this.user);
  }

  public login(username: string) {
    this.http
      .get<Array<User>>(environment.apiUrl + '/trainers?username=' + username)
      .subscribe((res) => {
        if (res[0]) {
          this.setUser(res[0]);
        } else {
          this.createUser(username);
        }
      });
  }

  public createUser(username: string) {
    const newUser = {
      username: username,
      pokemons: [],
    };
    this.http
      .post<User>(environment.apiUrl + '/trainers', newUser, this.httpOptions)
      .subscribe((res) => {
        this.setUser(res);
      });
  }

  public removePokemon(pokemonId: number) {
    const user = this.getUser();
    if (user) {
      user.pokemons = user.pokemons?.filter(
        (pokemon) => Number(pokemon) !== pokemonId
      );
      this.http
        .patch<User>(
          environment.apiUrl + '/trainers/' + user?.id,
          user,
          this.httpOptions
        )
        .subscribe((res) => {
          this.setUser(res);
        });
    }
  }

  public addPokemon(pokemon: Pokemon) {
    console.log(this.user);
    if (this.user) {
      console.log(pokemon);
      this.user.pokemons?.push(pokemon);
      this.http
        .patch<User>(
          environment.apiUrl + '/trainers/' + this.user?.id,
          this.user,
          this.httpOptions
        )
        .subscribe((res) => {
          this.setUser(res);
        });
    }
  }

  public logOut() {
    this.setUser({});
    this.router.navigate(['']);
  }
}
