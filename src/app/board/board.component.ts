import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {SquareComponent} from "../square/square.component";
import {GameTile} from "../game-tile";
import {GameService} from "../game.service";
import GenerateCommandModule from "@angular/cli/src/commands/generate/cli";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import * as timers from "timers";

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

  result = computed(() => {
    let a =false;
    if (this.selectedSquares().length===2) {
      console.log("this exec")
       a = this.selectedSquares()[0].content === this.selectedSquares()[1].content

      return a;
    }
    if (this.selectedSquares().length===0){
      a=false;
    }
    return a
  })
unSetSelected(){
    if (this.tmpTiles){
      this.tmpTiles.forEach(value => {
        value.selectedProp = false
      })
    }
}
  setSelected(){
    if (this.tmpTiles.length>=0){
      this.tmpTiles.forEach(value => {
        value.selectedProp=true;
      })
    }
  }

  addToSelection(id:number){
    let tmp = this.gameService.getCardById(id)

    const mySquares = this.tmpTiles;
    if (tmp){
    //  tmp.selectedProp = true;
      if (mySquares.find((tyeule)=>tyeule===tmp)){
       // tmp.selectedProp = false;
        this.unSetSelected();
        this.tmpTiles = [];
       // this.selectedSquares.update(value => this.tmpTiles);
      }
      else {

        this.tmpTiles.push(tmp)

      }
    }
    console.log("this that tmptiles "+this.tmpTiles)
    if (this.tmpTiles.length===2){
     this.selectedSquares.update(value => this.tmpTiles);

      setTimeout(()=>{
        this.unSetSelected()
        this.tmpTiles=[];
      },400)
    }

    //console.log(tmp)
    // console.log("this that magic shit fr fr : " +this.selectedSquares())
    // console.log("ligma squares : "+mySquares)
    this.setSelected();


  }
  tmpTiles:GameTile[] = [];



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
