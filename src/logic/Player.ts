import { CardDealer } from "./CardDealer";

export enum PlayerStatus {
  IS_PLAYING,
  HAS_WON,
  HAS_LOST,
}

export class Player extends CardDealer {
  readonly name: string;
  status: PlayerStatus;
  isComputer: boolean;

  constructor(name?: string) {
    super();
    this.name = name || "Computer";
    this.isComputer = !name;
    this.status = PlayerStatus.IS_PLAYING;
  }

  protected init(): void {}

  routine(): void {}
}
