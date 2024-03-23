import { CardDealer } from "./CardDealer";

export enum PlayerStatus {
  UNSTARTED,
  PLAYING,
  WON,
  LOST,
  DRAW,
}

export class Player extends CardDealer {
  readonly name: string;
  status: PlayerStatus;
  input: any;

  constructor(name: string) {
    super();
    this.name = name;
    this.status = PlayerStatus.UNSTARTED;
  }

  init(): void {
    this.status = PlayerStatus.PLAYING;
  }
}
