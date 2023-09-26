import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.models';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.models';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
})
export class PokedexPageComponent implements OnInit, OnDestroy {
  constructor(
    private pokedexService: PokedexService,
    private userService: UserService
  ) {}

  @Input()  pokemonsToDisplay: Pokemon[] = [];
  @Input() imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  @Input() genList: string[] = ["i", "ii", "iii", "iv", "v", "vi", "vii", "ix"]
  //TODO add custom pair 
  @Input() filterHidden: string = "hidden"

  pokemons: Pokemon[] = []
  selectedGen: string[] = []

  subscription?: Subscription;
  user?: User = this.userService.getUser();


  onSearchBarChange(event: any){
    this.pokemonsToDisplay = this.pokemons.filter(p => p.name.includes(event.target.value.toString()))
  }
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
    if(this.selectedGen.includes(`\"generation-${gen}\"`)){
      this.selectedGen = this.selectedGen.filter((g) =>{
        return g !== `\"generation-${gen}\"`
      })
    }else{
      this.selectedGen.push(`\"generation-${gen}\"`)
    }
    if(this.selectedGen.length > 0) this.updatePokemonList()
    else {
      this.pokemonsToDisplay = []
      this.pokemons = []
    }  
  }
  onFilterClick() {
    if (this.filterHidden === 'hidden') {
      this.filterHidden = 'display';
    } else {
      this.filterHidden = 'hidden';
    }
  }
  updatePokemonList() {
    let tempPokemon: Pokemon[] = []
    this.pokedexService.graphqlGet(this.getOptions())
    .subscribe((res) =>{

      res: res.data.pokemons.map((p: Pokemon) => {
        tempPokemon.push(p)
      }),
        (	    err: any) => console.log(err)
    })
    this.pokemonsToDisplay = tempPokemon
    this.pokemons = tempPokemon
  }

  addPokemon(pokemon: Pokemon) {
    this.userService.addPokemon(pokemon);
  }

  ngOnInit(): void {
    // this.updatePokemonList()

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
}
