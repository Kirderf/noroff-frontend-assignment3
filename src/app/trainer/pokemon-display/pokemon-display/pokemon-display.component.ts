import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.models';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
})
export class PokemonDisplayComponent {
  @Input() pokemon?: Pokemon;

  @Input() imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  @Output('pokemonDelete') onDelete: EventEmitter<number> = new EventEmitter();

  public onPokemonDelete(): void {
    this.onDelete.emit(this.pokemon?.id);
  }
}
