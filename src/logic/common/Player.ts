import { Deck } from "./Deck";

export enum PlayerStatus {
  UNSTARTED,
  PLAYING,
  WON,
  LOST,
  DRAW,
}

export class Player extends Deck {
  readonly name: string;
  status: PlayerStatus = PlayerStatus.UNSTARTED;
  input: any;

  constructor(name: string) {
    super();
    this.name = name;
  }

  init(): void {
    this.status = PlayerStatus.PLAYING;
  }
}
