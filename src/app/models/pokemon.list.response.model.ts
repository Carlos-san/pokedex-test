import { DefaultListItem } from "./default.list.item.model";

export class PokemonListResponseModel {
  count!: number;

  next!: string;

  previous!: string;

  results!: DefaultListItem[];
}
