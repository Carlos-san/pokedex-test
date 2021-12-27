import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    LayoutComponent,
    PokemonListItemComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSidenavModule
  ]
})
export class MainModule { }
