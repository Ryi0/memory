import {Tile} from "./tile";

export class GameTile implements Tile{
  private static _id = 0;
  content: string;
  uniqueId: number;

  constructor(cardNum:number) {
    this.content= String(cardNum);
    this.uniqueId=GameTile._id;
    GameTile._id++;
  }
toString(): string {
    return this.content;
}

}
