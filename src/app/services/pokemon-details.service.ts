import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { DetailedPokemonData, PokemonData } from 'src/app/models/pokemon.models';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {
  private readonly endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  private observablePokemonDetailCache: { [key: string]: Observable<DetailedPokemonData> } = {};
  private detailedPokemonCache: { [key: string]: DetailedPokemonData } = {};
  
  constructor(private http: HttpClient) { }

  graphqlGet(options: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      },
      )
    }
    // Data available
    if (this.detailedPokemonCache[options.body]){
      return of(this.detailedPokemonCache[options.body]);}
    // Request pending
    else if (this.observablePokemonDetailCache[options.body]){
      return this.observablePokemonDetailCache[options.body];
      }
    // New request needed
    else {
      this.observablePokemonDetailCache[options.body] = this.http.post<DetailedPokemonData>(this.endpoint, options.body, header)
    }

    return this.observablePokemonDetailCache[options.body];
  }
}