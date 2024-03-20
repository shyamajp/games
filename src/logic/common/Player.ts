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
}
