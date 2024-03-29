import { Deck } from "../common/Deck";
import { Playground } from "../common/Playground";

export class SpeedPlayground extends Playground {
  fields: Deck[];
  constructor(count: number, fields: Deck[]) {
    super(count);
    this.fields = fields;
  }
}
