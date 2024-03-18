import { Card } from "./Card";
import { CardDealer } from "./CardDealer";

export enum PlayerStatus {
  UNSTARTED,
  PLAYING,
  WON,
  LOST,
}

export class Player extends CardDealer {
  readonly name: string;
  status: PlayerStatus;
  readonly isComputer: boolean;
  input: any;

  constructor(name?: string) {
    super();
    this.name = name || "Computer";
    this.isComputer = !name;
    this.status = PlayerStatus.UNSTARTED;
  }

  init(): void {
    this.status = PlayerStatus.PLAYING;
  }

  removePairs(): number[] {
    const cards = this.cards.map((card) => new Card(card));
    const skipIndeces: number[] = [];
    const skipCards: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (!skipIndeces.includes(i) && cards[i].num === cards[j].num) {
          skipIndeces.push(i, j);
          skipCards.push(cards[i].raw, cards[j].raw);
        }
      }
    }

    skipCards.forEach((card) => this.remove(card));
    return skipCards;
  }
}
