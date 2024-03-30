import { v4 as uuidv4 } from "uuid";
import { Deck } from "./Deck";

export enum PlayerStatus {
  UNSTARTED,
  PLAYING,
  WON,
  LOST,
  DRAW,
}

export class Player {
  readonly id: string = uuidv4();
  readonly name: string;
  readonly count: number; // TODO: Pass count from Game?
  status: PlayerStatus = PlayerStatus.UNSTARTED;
  input: any; // TODO: Define input type
  data: { [key: string]: Deck };

  constructor(name: string, count: number = 54) {
    this.name = name;
    this.count = count;
    this.data = { hand: new Deck(count) };
  }

  init(): void {
    this.status = PlayerStatus.PLAYING;
  }
}
