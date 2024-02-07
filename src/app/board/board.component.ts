import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {SquareComponent} from "../square/square.component";
import {GameTile} from "../game-tile";
import {GameService} from "../game.service";
import GenerateCommandModule from "@angular/cli/src/commands/generate/cli";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

// class tile {
//   uniqueId:number = 0; //try to use it only as gui
//
//   private static id:number = 0;
//   public cardNum;
//   constructor(cardNum:number) {
//     console.log()
//     this.cardNum = cardNum;
//     this.uniqueId = tile.id;
//     tile.id++;
//     console.log(`a new card has been created. id is : ${this.uniqueId}`)
//   }
//
//
//   toString(){
//     return this.cardNum;
//   }
//
//
//   // uniqueId:number = 0;
//   // id: this.uniqueId,
//   // cardNum:0,
// }

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{

  private _clickIndex:1|2|3 =1 ;
   selectedSquares = signal<SquareComponent[]>([]);
   result = computed(()=>{
     const squares = this.selectedSquares();
     if (squares.length===2){

       if (():boolean=>{
         const sameCardFlag = () => { //true if not the same card
          return  squares[0].squareUniqueId!==squares[1].squareUniqueId;
         }
         const sameContentFlag = () => { //true if same content but different card
           return squares[0].cardContent===squares[1].cardContent;
         }
          return sameCardFlag()&&sameContentFlag();
       }){
        console.log(`${squares} those are good`)
         return true;
       }

     }
     return false;

   })
  // get clickIndex():1|2|3{
  //   return this._clickIndex;
  // }
    Tmpcard1: GameTile | undefined = undefined
    Tmpcard2: GameTile | undefined = undefined

  clickEventCardSelector(id:number) {
     if (this.result()){
       console.log("this is inside of the click event. it returned true")
     }
      let tmp = this.gameService.getCardById(id)
    this._clickIndex++;
    console.log(id)
    console.log(tmp)
      if (tmp) {
        this.cardAssign(tmp)
      }
      else console.log("Click has failed check the click event function in board component")
    }
  cardAssign(card:GameTile){
    if (this._clickIndex===1){
      this.Tmpcard1 = card;
    }
    if (this._clickIndex===2){
      this.Tmpcard2 = card;
    }
  }

  /**
   * method is very fucky, will probably try to motivate myself to maybe fix it later on
   * @param id
   * @deprecated
   */
  selectCard(id:number):GameTile |undefined{
    const cardSelected=  this.gameService.getCardById(id);
    if (this._clickIndex>2){
     // console.log(`${this.Tmpcard1?.toString()} and ${this.Tmpcard2?.toString()}`)
      this._clickIndex=1
    }
    if (cardSelected!=undefined){
      this._clickIndex++;
    }
    return cardSelected;
  }

  allTheTiles:GameTile[]= [];
  gameService: GameService = inject(GameService)

  constructor() {
    this.allTheTiles = this.gameService.getAllCards();
  }

  ngOnInit(): void {
  }

  // protected readonly update = update;
}
