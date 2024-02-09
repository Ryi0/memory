import {Component, Input} from '@angular/core';
import {BoardComponent} from "../board/board.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  getCounts(){
   const board = this.BoardComponent;
   return board.getScores();
  }
  playerOneScore = this.getCounts()[0];
  playerTwoScore = this.getCounts()[1];

  // @Input() playerOneScore:number = 0;
  // @Input() playerTwoScore:number = 0;
  protected readonly BoardComponent = BoardComponent;
}
