import { Component, Input, SimpleChanges } from '@angular/core';
import { DetailedPokemon, DetailedPokemonData, Pokemon } from '../models/pokemon.models';
import { PokedexService } from '../services/pokemon.service';
import { PokemonDetailsService } from '../services/pokemon-details.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: []
})
export class PokemonDetailsComponent {
  @Input() pokemonData: DetailedPokemon = {name: "", id: 9999, evolution_chain_id: 9999,
    pokemonhabitat: "",
    pokemontypes: [""]}
  @Input() imgUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  @Input() selectedPokemon: Pokemon = {name: "d", id: 99999};
  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedPokemon.id === 99999) return
    this.pokedexService.graphqlGet(this.getOptions()).subscribe((res: DetailedPokemonData) =>{
      res:{
        const data = res.data.pokemon[0]
         let pokemonData: DetailedPokemon = {name: data.name, id: data.id, evolution_chain_id: data.evolution_chain_id,
          pokemonhabitat: (data.pokemon_v2_pokemonhabitat) ? data.pokemon_v2_pokemonhabitat.name : "null",
          pokemontypes: data.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map((e) => (e.pokemon_v2_type.name))
        } 
        this.pokemonData = pokemonData
      }
      (	    err: any) => console.log(err)
    })
  }
  constructor(
    private pokedexService: PokemonDetailsService,
  ) {}
  public getOptions(): any {
    const headers = {
      'content-type': 'application/json',
    };
    let query = `
    query pokemon_details {
      pokemon: pokemon_v2_pokemonspecies(where: {id: {_eq: ${this.selectedPokemon.id}}}) {
        name
        id
        evolution_chain_id
        pokemon_v2_pokemonhabitat {
          name
        }
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
    `;
    const graphqlQuery = {
      operationName: 'pokemon_details',
      query: query,
      variables: {},
    };
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };
    console.log(options);
    return options;
  }
}
