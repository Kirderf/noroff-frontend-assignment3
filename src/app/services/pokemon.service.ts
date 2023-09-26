import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { PokemonData } from 'src/app/models/pokemon.models';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private readonly endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  private observableCache: { [key: string]: Observable<PokemonData> } = {};
  private clubCache: { [key: string]: PokemonData } = {};
  
  constructor(private http: HttpClient) { }

  graphqlGet(options: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      },
      )
    }
    // Data available
    if (this.clubCache[options.body]){
      console.log("hente fra cache")
      return of(this.clubCache[options.body]);}
    // Request pending
    else if (this.observableCache[options.body]){
      console.log("hente pending fra cache")
      return this.observableCache[options.body];
      }
    // New request needed
    else {
      console.log("hente fra api")
      this.observableCache[options.body] = this.http.post<PokemonData>(this.endpoint, options.body, header)
    }

    return this.observableCache[options.body];
  }
}
