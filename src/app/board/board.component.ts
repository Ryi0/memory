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
   selectedSquares = signal<GameTile[]>([]);
   // result = computed(()=>{
   //   let squares = this.selectedSquares();
   //   console.log("lengt is "+squares.length);
   //   if (squares.length>=2){
   //
   //     if (():boolean=>{
   //       const sameCardFlag = () => { //true if not the same card
   //        return  squares[0].uniqueId!==squares[1].uniqueId;
   //       }
   //       const sameContentFlag = () => { //true if same content but different card
   //         return squares[0].content===squares[1].content;
   //       }
   //        return sameCardFlag()&&sameContentFlag();
   //     }){
   //      console.log(`${squares} those are good`)
   //       squares=[];
   //        this.selectedSquares.update(()=>[])
   //       return true;
   //     }
   //
   //   }
   //   return false;
   //
   // })

  result = computed(() => {
    let a =false;
    if (this.selectedSquares().length===2) {
       a = this.selectedSquares()[0].content === this.selectedSquares()[1].content

      return a;
    }
    return a
  })

  addToSelection(id:number){
    let tmp = this.gameService.getCardById(id)
    const mySquares = this.tmpTiles;
    if (tmp){
      if (mySquares.find((tyeule)=>tyeule===tmp)){
        this.tmpTiles = [];
      }
      else this.tmpTiles.push(tmp)
    }
    console.log("this that tmptiles "+this.tmpTiles)
    if (this.tmpTiles.length===2){
      this.selectedSquares.update(value => this.tmpTiles);
      this.tmpTiles=[];
    }
    //console.log(tmp)
    console.log(this.selectedSquares())
  }
  // get clickIndex():1|2|3{
  //   return this._clickIndex;
  // }
  Tmpcard1: GameTile = new GameTile(-1);
  Tmpcard2: GameTile = new GameTile(-2);
  tmpTiles:GameTile[] = [];
  componentTiles: SquareComponent[] = [];

  clickEventCardSelector(id:number) {

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

  constructor() { //reminder try to put constructor args in ngoninit
    this.allTheTiles = this.gameService.getAllCards();
  }

  ngOnInit(): void {
  }
  // I think I broke sum
  // protected readonly update = update;
  protected readonly SquareComponent = SquareComponent;
}
