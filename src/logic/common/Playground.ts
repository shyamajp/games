import { Deck } from "./Deck";

export class Playground {
  readonly name: string = "Playground";
  readonly count: number;
  data: { [key: string]: Deck };

  constructor(count: number) {
    this.count = count;
    this.data = {
      starter: new Deck(this.count),
    };
    this.data.starter.generate();
  }

  init(): void {
    this.data.starter.shuffle();
  }
}
