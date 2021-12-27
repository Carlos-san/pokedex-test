import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonListResponseModel } from '../models/pokemon.list.response.model';
import { PokemonDetailModel } from '../models/pokemon.detail.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonCountLimit = 1000;

  readonly pokeApiEndpoint = environment.pokeapi;

  constructor(
    private readonly http: HttpClient
  ) { }

  getPokemonListPaginated(): Observable<PokemonListResponseModel> {
    return this.http.get<PokemonListResponseModel>(
      `${this.pokeApiEndpoint}pokemon?limit=${this.pokemonCountLimit}&offset=0`
    );
  }

  getPokemonList(): Observable<PokemonListResponseModel> {
    return this.http.get<PokemonListResponseModel>(`${this.pokeApiEndpoint}pokemon`);
  }

  getPokemonDetail(pokemonId: number): Observable<PokemonDetailModel> {
    return this.http.get<PokemonDetailModel>(`${this.pokeApiEndpoint}pokemon/${pokemonId}/`);
  }
}
