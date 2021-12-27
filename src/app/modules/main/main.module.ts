import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    PokemonListComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule
  ]
})
export class MainModule { }
