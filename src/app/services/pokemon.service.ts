import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { PokemonData } from 'src/app/models/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  constructor(private http: HttpClient) { }

  graphqlGet(options: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      },
      )
    }
    console.log(options.body)
    return this.http.post<PokemonData>(this.endpoint, options.body, header)
  }
}
