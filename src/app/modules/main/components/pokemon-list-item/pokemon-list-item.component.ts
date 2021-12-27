import { EventEmitter, OnChanges, Output, SimpleChanges } from "@angular/core";
import { DefaultListItem } from "src/app/models/default.list.item.model";
import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { PokemonService } from "src/app/services/pokemon.service";
import { PokemonDetailModel } from "src/app/models/pokemon.detail.model";

@Component({
  selector: 'pkm-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})
export class PokemonListItemComponent implements OnInit, OnChanges {

  @Input() pokemonListItemModel?: DefaultListItem;

  @Output() onPokemonSelected = new EventEmitter<number>();

  pokemonIdSubject = new Subject<number>();

  pageSubscriptionHandler = new Subscription();

  pokemonDetail?: PokemonDetailModel;

  pokemonId?: number;

  constructor(
    private readonly pokemonService: PokemonService
  ) {
    this.getPokemonDetails();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonListItemModel'] !== undefined &&
      changes['pokemonListItemModel'].currentValue !== undefined &&
      changes['pokemonListItemModel'].currentValue !== changes['pokemonListItemModel'].previousValue) {
        const pokemonId = this.extractPokemonIdfromUrl();

        if(pokemonId !== -1) {
          this.pokemonId = pokemonId;
          this.pokemonIdSubject.next(
            pokemonId
          );
        }
    }
  }

  getPokemonDetails() {
    this.pageSubscriptionHandler.add(
      this.pokemonIdSubject.subscribe(
        (pokemonId: number) => {
          this.pokemonService.getPokemonDetail(pokemonId).subscribe(
            (response: any) => {
              this.pokemonDetail = response;
            }
          )
        }
      )
    );
  }

  onPokemonSelectedEvent(): void {
    this.onPokemonSelected.emit(this.pokemonId);
  }


  private extractPokemonIdfromUrl(): number {
    if(!this.pokemonListItemModel?.url) {
      return -1;
    }

    const pokemonUrlSplit = this.pokemonListItemModel?.url.split('/');
    return pokemonUrlSplit.length > 0 && pokemonUrlSplit[pokemonUrlSplit.length - 2] !== undefined ?
      Number(pokemonUrlSplit[pokemonUrlSplit.length - 2]): 0;
  }

}
