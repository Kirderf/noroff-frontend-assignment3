import { Component, Input } from '@angular/core';
import { PokedexService } from '../../service/pokemon.service';
import { Pokemon } from '../models/pokemon.models';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
})
export class PokedexPageComponent {
  @Input()  pokemons: Pokemon[] = [];
  @Input() imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  constructor(private pokedexService: PokedexService) { }
  public getOptions(): any{    
    const headers = {
      "content-type": "application/json"
    };
    const query =`
    query pokemon_details {
      pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
        name
        id
      }
    }
    `
    const graphqlQuery = {
      "operationName": "pokemon_details",
      "query": query,
      "variables": {}
    };
    const options = {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify(graphqlQuery)
  };
    return options
  }
  ngOnInit() {
    this.pokedexService.graphqlGet(this.getOptions())
    .subscribe((res) =>{
      res: res.data.pokemons.map((p: Pokemon) => {
        this.pokemons.push(p)
      }),
        (	    err: any) => console.log(err)
    })
  
  } 
}
