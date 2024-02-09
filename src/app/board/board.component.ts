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

clickHandler(id:number){
  setTimeout(()=>{
    this.addToSelection(id);
  },500)

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
    if (this.result()){
      this.selectedSquares().forEach(value => {
         const index:number =  this.allTheTiles.indexOf(value)
         const tile =  this.allTheTiles.find(value1 => value===value);
         tile? value.hidden=true:tile;
         // this.allTheTiles.splice(index, 1)
          //this.allTheTiles.at(index).hidden=true;
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
    if(this.gameService.getCardById(id)?.hidden){
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
     this.selectedSquares.update(value => this.tmpTiles);
     setTimeout(()=>{
       this.removeTile();
     },500)

      setTimeout(()=>{
        this.unSetSelected()
        this.tmpTiles=[];
      },500)
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
  // I think I broke sum
  // protected readonly update = update;
  protected readonly SquareComponent = SquareComponent;
}
