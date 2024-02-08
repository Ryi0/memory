import {Component, input, Input} from '@angular/core';


@Component({
  selector: 'app-square',
  template: `
    <div class="item" *ngIf="isHidden; then hide else unHide" [ngClass]="{'selectedItem':isSelected&&!isHidden, 'notSelected':!isSelected&&!isHidden, 'isHidden':isHidden}
     ">


    </div>
    <div class="item" [ngClass]="{'selectedItem':isSelected&&!isHidden, 'notSelected':!isSelected&&!isHidden, 'isHidden':isHidden}">
      <ng-template    #hide> X </ng-template>
      <ng-template  #unHide>{{ cardContent }}</ng-template>
    </div>

  `,
  styleUrl: './square.component.scss'
})

export class SquareComponent {
  @Input() cardContent:any;
  @Input() squareUniqueId:number|undefined;
  @Input() isSelected:boolean = false;
  @Input() isHidden:boolean=false;
  // uniqueId:number = 0; //try to use it only as gui
  //
  // private static id:number = 0;
  //
  // ngOnInit(): void {
  //   this.uniqueId = SquareComponent.id;
  //   SquareComponent.id++;
  // }



}
