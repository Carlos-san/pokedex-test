import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { debounceTime, filter, Subject, Subscription } from 'rxjs';
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

  allPokemonList: DefaultListItem[] = [];

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
          this.paginationModel.page = 0;

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
        (filters: any) => {
          if(this.allPokemonList.length === 0){
            this.pokemonListSubject.next([]);
            this.pokemonCount = 0;

            return;
          }

          const filteredPokemon = this.getPokemonListFiltered(filters.searchBar);
          const offset = this.paginationModel.getOffSet();
          this.pokemonListSubject.next(
            filteredPokemon === undefined ? []:
            filteredPokemon.slice(
              offset,
              offset + this.paginationModel.pageSize
            )
          );
          this.pokemonCount = filteredPokemon.length;
        }
      )
    );


    this.pageSubscriptionHandler.add(
      this.pokemonService.getPokemonListPaginated().subscribe((response: PokemonListResponseModel) => {
        this.handlePokemonListResponse(response);
      })
    );
  }

  getPokemonListFiltered(searchFilter: string) {
    if(searchFilter === '') {
      return [...this.allPokemonList];
    }

    const searchLowered = searchFilter.toLowerCase();

    return this.allPokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(searchLowered)
    );
  }

  handlePokemonListResponse(response: PokemonListResponseModel) {
    this.allPokemonList = response.results;
    this.filtersSubject.next({ searchBar: this.searchFilter.value});
  }

  ngOnDestroy(): void {
    this.pageSubscriptionHandler.unsubscribe();
  }

  onPokemonSelected(pokemonId: number) {
    this.pokemonIdSelected = pokemonId;
    this.drawer.toggle();
  }

}
