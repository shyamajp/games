import { Deck } from "./Deck";

export class Playground {
  readonly name: string = "Playground";
  readonly count: number;
  starter: Deck;

  constructor(count: number) {
    this.count = count;
    this.starter = new Deck(this.count);
    this.starter.generate();
  }

  init(): void {
    this.starter.shuffle();
  }
}
