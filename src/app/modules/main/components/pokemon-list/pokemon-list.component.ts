import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { DefaultListItem } from 'src/app/models/default.list.item.model';
import { PaginationModel } from 'src/app/models/pagination.model';

import { PokemonListResponseModel } from 'src/app/models/pokemon.list.response.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'pkm-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  paginationModel = new PaginationModel();

  pageSubscriptionHandler = new Subscription();

  pokemonCount = 0;

  filtersSubject = new Subject();

  pokemonListSubject = new Subject<DefaultListItem[]>();

  constructor(
    private readonly pokemonService: PokemonService
  ) {
    this.setPokemonListSubscription();
  }

  ngOnInit(): void {
    this.filtersSubject.next({});
  }

  onPageChange(pageChangeEvent: PageEvent) {
    if (this.paginationModel.pageSize !== pageChangeEvent.pageSize) {
      this.paginationModel.pageSize = pageChangeEvent.pageSize;
      this.paginationModel.page = 0;
    } else {
      this.paginationModel.page = pageChangeEvent.pageIndex;
    }

    this.filtersSubject.next({});
  }

  setPokemonListSubscription() {
    this.pageSubscriptionHandler.add(
      this.filtersSubject.subscribe(
        (filtersApplied: any) => {
          this.pokemonService.getPokemonListPaginated(
            this.paginationModel.pageSize,
            this.paginationModel.getOffSet()
          ).subscribe((response: PokemonListResponseModel) => {
            this.handlePokemonListResponse(response);
          })
        }
      )
    );
  }

  handlePokemonListResponse(response: PokemonListResponseModel) {
    this.pokemonCount = response.count;
    this.pokemonListSubject.next(response.results);
  }

  ngOnDestroy(): void {
    this.pageSubscriptionHandler.unsubscribe();
  }

}
