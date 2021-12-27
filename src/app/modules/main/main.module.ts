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
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
