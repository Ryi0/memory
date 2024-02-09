import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {SquareComponent} from "../square/square.component";
import {GameTile} from "../game-tile";
import {GameService} from "../game.service";
import GenerateCommandModule from "@angular/cli/src/commands/generate/cli";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import * as timers from "timers";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  private static playerOneCount: number;
  private static playerTwoCount: number;

clickHandler(id:number){
if(this.onFroze)
  return
    if(!this.onFroze){
      this.addToSelection(id);
      //this.onFroze = true;
    }
}

  playerOneToPlay:boolean = true;
  playerOneCount:number = 0;
  playerTwoCount:number = 0;

incPlayer(){
  if (this.playerOneToPlay){
    this.playerOneCount++
  }
  else this.playerTwoCount++;
}
  // incPlayerOne(){
  //   this.playerOneCount++;
  // }
  // incPlayerTwo(){
  //   this.playerTwoCount++;
  // }

resetPlayers(){
  this.playerTwoCount = 0;
  this.playerOneCount = 0;
  this.playerOneToPlay = true;
}

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

  removeTile(){
    if (this.result()){ //could probably add here that depending on what player to play give points to that player or opposite player idk logic seems weird
      this.incPlayer();
      this.selectedSquares().forEach(value => {
         const index:number =  this.allTheTiles.indexOf(value)
         const tile =  this.allTheTiles.find(value1 => value===value);
         tile? value.hidden=true:tile;
      })
    }
  }

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

  resetGame(){
    this.resetPlayers();
    this.tmpTiles = [];
    this.selectedSquares.update(()=>[])
    this.allTheTiles.forEach(value =>{
      value.hidden = false;
      value.selectedProp = false;
    })
    setTimeout(()=>{
      this.shuffle();
    }, 500)

  }
  onFroze:boolean = false;
  addToSelection(id:number){
    if(this.gameService.getCardById(id)?.hidden){ // problem here is that this will return false if card is undefined
      return;
    }
    let tmp = this.gameService.getCardById(id)
    const mySquares = this.tmpTiles;
    if (tmp){
      if (mySquares.find((tyeule)=>tyeule===tmp)){
        this.unSetSelected();
        this.tmpTiles = [];
      }
      else {
        this.tmpTiles.push(tmp)
      }
    }
    console.log("this that tmptiles "+this.tmpTiles)
    if (this.tmpTiles.length===2){
      if(this.onFroze)
        return
      //this.incPlayer();
      this.playerOneToPlay=!this.playerOneToPlay;
      if(!this.onFroze){
        this.onFroze = true;
        this.selectedSquares.update(value => this.tmpTiles);

        setTimeout(()=>{
          this.removeTile();
          //this.onFroze = false;
          this.unSetSelected()
          this.tmpTiles=[];
        },500)

      }
      setTimeout(()=>{
        this.onFroze=false;
      },500)
      //this.onFroze=true;

    }
      this.setSelected();
  }
  tmpTiles:GameTile[] = [];
  allTheTiles:GameTile[]= [];
  gameService: GameService = inject(GameService)
  constructor() { //reminder try to put constructor args in ngoninit
    this.allTheTiles = this.gameService.getAllCards();
  }
   shuffle() { //stack overflow ngl https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = this.allTheTiles.length,  randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.allTheTiles[currentIndex], this.allTheTiles[randomIndex]] = [
        this.allTheTiles[randomIndex], this.allTheTiles[currentIndex]];
    }
    //return this.allTheTiles;
  }
  ngOnInit(): void {
    this.shuffle()
  }

  public static getScores(){
    return [this.playerOneCount, this.playerTwoCount];
  }

  // I think I broke sum
  // protected readonly update = update;
  protected readonly SquareComponent = SquareComponent;


}
