import { Injectable } from '@angular/core';
import {GameTile} from "./game-tile";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Debating where to place cardSelector method.
   * Could be cool to make it here because the click index will be global to all grids
   * Could make a game where you need to assign each definition to the respective image etc
   * and those images will be on a separate grid than the definition
   * HOWEVER since the ids reset every time i make a new board, I could also just compare the ids
   * that would be ideal if i only envision two maximum compares with two clicks and two grids
   * For now, it will do.
   */

  constructor() { }

  private arrayOfTiles(){
    const tiles1Tmp:GameTile[] = makeHalfArray();
    const tiles2Tmp:GameTile[] = makeHalfArray();

    function makeHalfArray(){
      const arrayTmp = Array(6).fill(-1);
      for (let i = 0; i < 6; i++) {
        arrayTmp[i]=new GameTile(i);
      }
      return arrayTmp;
    }

    return tiles1Tmp.concat(tiles2Tmp);
  }
  protected cardList:GameTile[] = this.arrayOfTiles();

  /**
   * This function could be slimmer but
   * like this, it is easier to change the return value if the card isn't found
   * by changing the undefined return type to the wanted return type
   * @param id
   */

  getCardById(id:number):GameTile|undefined{
    const tmpCard = this.cardList.find(GameTile=>{
     return  GameTile.uniqueId===id;
    })
    if (tmpCard!=undefined){
      return tmpCard;
    }
    else return undefined
  }
  getAllCards(){
    return this.cardList;
  }
}
