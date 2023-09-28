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
  private observablePokemonCache: { [key: string]: Observable<PokemonData> } = {};
  private pokemonCache: { [key: string]: PokemonData } = {};
  
  constructor(private http: HttpClient) { }

  graphqlGet(options: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      },
      )
    }
    // Data available
    if (this.pokemonCache[options.body]){
      return of(this.pokemonCache[options.body]);}
    // Request pending
    else if (this.observablePokemonCache[options.body]){
      return this.observablePokemonCache[options.body];
      }
    // New request needed
    else {
      this.observablePokemonCache[options.body] = this.http.post<PokemonData>(this.endpoint, options.body, header)
    }

    return this.observablePokemonCache[options.body];
  }
}
