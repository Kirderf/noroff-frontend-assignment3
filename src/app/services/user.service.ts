import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: User;
  userChange = new Subject<User>();

  httpOptions = {
    headers: new HttpHeaders({ 'X-API-KEY': environment.apiKey })
  };


  constructor(private readonly http: HttpClient, private router : Router) {
    this.userChange.subscribe((user: User) => {
      if (user.username){
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
   this.http.get<Array<User>>(environment.apiUrl + "/trainers?username=" + username)
   .subscribe((res) => {
      if(res.length > 0) {
        this.setUser(res[0]);
        this.router.navigate(['/pokedex']);
      }else{
        this.createUser(username);
      }
   });
  }


  public createUser(username: string) {
    const user = {
      username: username,
      pokemons: []
    };
    this.http.post<User>(environment.apiUrl + "/trainers", user, this.httpOptions)
      .subscribe((res) => {
        this.setUser(res);
        this.router.navigate(['/pokedex']);
      });
  }

}
