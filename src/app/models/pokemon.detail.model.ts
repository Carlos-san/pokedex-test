import { DefaultListItem } from "./default.list.item.model";
import { MovesModel } from "./moves.model";
import { PokemonSpritesModel } from "./pokemon.sprites.model";
import { TypeItem } from "./types.model";

export class PokemonDetailModel {
  base_experience!: number;

  forms!: DefaultListItem[];

  sprites!: PokemonSpritesModel;

  types!: TypeItem[];

  height!: number;

  weight!: number;

  moves!: MovesModel[];
}
