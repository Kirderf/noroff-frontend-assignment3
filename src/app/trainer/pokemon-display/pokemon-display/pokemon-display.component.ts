import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.models';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
})
export class PokemonDisplayComponent implements OnInit {

  @Input() pokemon: Pokemon[] = [];

  constructor(private readonly userService: UserService){

  }
  
  ngOnInit(): void {
    const user = this.userService.getUser();

    if(user && user.pokemons){
      this.pokemon = user.pokemons.map(pokemonName => pokemonName);
    }
  }
}
