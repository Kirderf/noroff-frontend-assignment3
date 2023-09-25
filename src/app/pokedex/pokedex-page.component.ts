import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
})
export class PokedexPageComponent implements OnInit {
  constructor(
    private pokedexService: PokedexService,
    private userService: UserService
  ) {}
  @Input() pokemons: Pokemon[] = [];
  @Input() imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  @Input() genList: string[] = [
    'i',
    'ii',
    'iii',
    'iv',
    'v',
    'vi',
    'vii',
    'ix',
    'iix',
  ];
  //TODO add custom pair
  @Input() filterHidden: string = 'hidden';

  selectedGen: string[] = [];

  public getOptions(): any {
    const headers = {
      'content-type': 'application/json',
    };
    let query = `
    query pokemon_details {
        pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: [<REPLACE>]}}}, order_by: {id: asc}) {
          name
          id
        }
      }
    `;
    /*
    {"operationName":"pokemon_details","query":"\n    query pokemon_details {\n        gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: generation-iii}}}, order_by: {id: asc}) {\n          name\n          id\n        }\n      }\n    ","variables":{}}
    {"operationName":"pokemon_details","query":"\n    query pokemon_details {\n        gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: [\"generation-i\"]}}}, order_by: {id: asc}) {\n          name\n          id\n        }\n      }\n    ","variables":{}}
    */
    query = query.replace('<REPLACE>', this.selectedGen.toString());

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
  onFilterElementClick(gen: string) {
    console.log(gen);
    this.selectedGen.push(`\"generation-${gen}\"`);
    console.log(this.getOptions().body);
    this.updatePokemonList();
  }
  onFilterClick() {
    if (this.filterHidden === 'hidden') {
      this.filterHidden = 'display';
    } else {
      this.filterHidden = 'hidden';
    }
  }
  updatePokemonList() {
    this.pokedexService.graphqlGet(this.getOptions()).subscribe((res) => {
      console.log(res);
      res: res.data.pokemons.map((p: Pokemon) => {
        this.pokemons.push(p);
      }),
        (err: any) => console.log(err);
    });
  }

  addPokemon(pokemon: Pokemon) {
    console.log(pokemon);
    this.userService.addPokemon(pokemon);
  }

  ngOnInit() {
    // this.updatePokemonList()
  }
}
