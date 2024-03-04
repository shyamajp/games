export enum PlayerStatus {
  IS_PLAYING,
  HAS_WON,
  HAS_LOST,
}

export class Player {
  cards: number[];
  readonly name: string;
  status: PlayerStatus;

  constructor(name: string) {
    this.name = name;
    this.cards = [];
    this.status = PlayerStatus.IS_PLAYING;
  }

  sort() {
    this.cards.sort((a, b) => a - b);
  }

  add(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in your hand");
    }

    this.cards.push(card);
    this.sort();
    return card;
  }

  remove(card: number) {
    const index = this.cards.indexOf(card);
    if (index < -1) {
      throw new Error("This card is not in your hand");
    }
    this.cards.splice(index, 1);
    this.sort();
    return card;
  }
}
