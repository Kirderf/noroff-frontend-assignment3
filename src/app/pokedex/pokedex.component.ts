import { Component, Input } from '@angular/core';
import { PokedexService } from '../../service/pokemon.service';
import { Pokemon } from '../models/pokemon.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { query } from '@angular/animations';
interface FormData {
  getAll(): string[]
}
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
})
export class PokedexComponent {
  @Input()  pokemons: Pokemon[] = [];
  @Input() imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  @Input() genList: string[] = ["i", "ii", "iii", "iv", "v", "vi", "vii", "ix", "iix"]
  //TODO add custom pair 
  @Input() filterHidden: string = "hidden"

  selectedGen: string[] = []
  constructor(private pokedexService: PokedexService) { }
  addQuotes(str: string){
    return `"${str}"`
  }
  public getOptions(): any{    
    const headers = {
      "content-type": "application/json"
    };
    let query =`
    query pokemon_details {
      pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {{_in: ${this.selectedGen}}}}, order_by: {id: asc}) {
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
  onFilterElementClick(gen: string){
    console.log(gen)
    this.selectedGen.push(this.addQuotes(gen))
    console.log(this.getOptions().body)
   // this.updatePokemonList()
  }
  onFilterClick(){
    if(this.filterHidden === "hidden"){
      this.filterHidden = "display"
    }else{
      this.filterHidden = "hidden"
    }
  }
  updatePokemonList(){
    this.pokedexService.graphqlGet(this.getOptions())
    .subscribe((res) =>{
      console.log(res)
      res: res.data.pokemons.map((p: Pokemon) => {
        this.pokemons.push(p)
      }),
        (	    err: any) => console.log(err)
    })
  }
  ngOnInit() {
   // this.updatePokemonList()
  } 
}
