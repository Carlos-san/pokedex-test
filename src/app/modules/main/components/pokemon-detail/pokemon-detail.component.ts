import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PokemonDetailModel } from 'src/app/models/pokemon.detail.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'pkm-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Input() pokemonId?: number;

  pokemonIdSubject = new Subject<number>();

  pageSubscriptionHandler = new Subscription();

  pokemonDetail?: PokemonDetailModel;

  viewMovementList = true;

  constructor(
    private readonly pokemonService: PokemonService
  ) {
    this.getPokemonDetail();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonId'] &&
      changes['pokemonId'].currentValue &&
      changes['pokemonId'].currentValue !== changes['pokemonId'].previousValue ){
        this.pokemonIdSubject.next(changes['pokemonId'].currentValue);
        this.viewMovementList = true;
    }else {
      this.pokemonDetail = undefined;
    }
  }

  getPokemonDetail() {
    this.pageSubscriptionHandler.add(
      this.pokemonIdSubject.subscribe(
        (pokemonId: number) => {
          if(pokemonId === undefined || pokemonId === -1){
            this.pokemonDetail = undefined;
            return;
          }

          this.pokemonService.getPokemonDetail(pokemonId).subscribe(
            (response: PokemonDetailModel) => {
              this.pokemonDetail = response;
            }
          )
        }
      )
    );
  }

  onShowMovementList() {
    this.viewMovementList = !this.viewMovementList;
  }

  ngOnDestroy(): void {
    this.pageSubscriptionHandler.unsubscribe();
  }
}
