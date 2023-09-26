import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokedexService } from '../../service/pokemon.service';
import { Pokemon, PokemonData } from '../models/pokemon.models';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
})
export class PokedexComponent {
  @Input()  pokemonsToDisplay: Pokemon[] = [];
  @Input() imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  @Input() genList: string[] = ["i", "ii", "iii", "iv", "v", "vi", "vii", "ix"]
  //TODO add custom pair 
  @Input() filterHidden: string = "hidden"

  pokemons: Pokemon[] = []
  selectedGen: string[] = []
  constructor(private pokedexService: PokedexService) { }

  public getOptions(): any{    
    const headers = {
      "content-type": "application/json"
    };
    let query =`
    query pokemon_details {
        pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: [<REPLACE>]}}}, order_by: {id: asc}) {
          name
          id
        }
      }
    `
    /*
    {"operationName":"pokemon_details","query":"\n    query pokemon_details {\n        gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: generation-iii}}}, order_by: {id: asc}) {\n          name\n          id\n        }\n      }\n    ","variables":{}}
    {"operationName":"pokemon_details","query":"\n    query pokemon_details {\n        gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_in: [\"generation-i\"]}}}, order_by: {id: asc}) {\n          name\n          id\n        }\n      }\n    ","variables":{}}
    */
    query = query.replace("<REPLACE>", this.selectedGen.toString())
 

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
  onSearchBarChange(event: any){
    this.pokemonsToDisplay = this.pokemons.filter(p => p.name.includes(event.target.value.toString()))
  }
  onFilterElementClick(gen: string){
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
 
  onFilterClick(){
    if(this.filterHidden === "hidden"){
      this.filterHidden = "display"
    }else{
      this.filterHidden = "hidden"
    }
  }
  updatePokemonList(){
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
  ngOnInit() {
   // this.updatePokemonList()
  } 
}
