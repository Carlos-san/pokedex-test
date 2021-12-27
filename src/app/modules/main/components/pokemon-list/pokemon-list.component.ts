import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { debounceTime, Subject, Subscription } from 'rxjs';
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

  pokemonIdSelected?: number;

  searchFilter = new FormControl('');

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private readonly pokemonService: PokemonService
  ) {
    this.setPokemonListSubscription();
    this.setSearchEvent();
  }

  ngOnInit(): void {
    this.filtersSubject.next({ searchBar: this.searchFilter.value});
  }

  setSearchEvent(): void {
    this.pageSubscriptionHandler.add(
      this.searchFilter.valueChanges.pipe(
        debounceTime(400)
      ).subscribe(
        (search) => {
          this.filtersSubject.next({ searchBar: search});
        }
      )
    )
  }

  onPageChange(pageChangeEvent: PageEvent) {
    if (this.paginationModel.pageSize !== pageChangeEvent.pageSize) {
      this.paginationModel.pageSize = pageChangeEvent.pageSize;
      this.paginationModel.page = 0;
    } else {
      this.paginationModel.page = pageChangeEvent.pageIndex;
    }

    this.filtersSubject.next({ searchBar: this.searchFilter.value});
  }

  setPokemonListSubscription() {
    this.pageSubscriptionHandler.add(
      this.filtersSubject.subscribe(
        (filtersApplied: any) => {
          this.pokemonService.getPokemonListPaginated(
            this.paginationModel.pageSize,
            this.paginationModel.getOffSet(),
            filtersApplied.searchBar
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

  onPokemonSelected(pokemonId: number) {
    this.pokemonIdSelected = pokemonId;
    this.drawer.toggle();
  }

}
