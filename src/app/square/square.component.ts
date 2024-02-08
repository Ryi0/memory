import {Component, input, Input} from '@angular/core';


@Component({
  selector: 'app-square',
  template: `
    <div class="item"  [ngClass]="{'selectedItem':isSelected&&!isHidden, 'notSelected':!isSelected&&!isHidden, 'isHidden':isHidden}  ">
      <div *ngIf="!isSelected; then hide else unHide"></div>
      <ng-template #hide> <ng-container>X</ng-container> </ng-template>
      <ng-template #unHide><ng-container>{{ cardContent }}</ng-container></ng-template>
    </div>
  `,
  styleUrl: './square.component.scss'
})

export class SquareComponent {
  @Input() cardContent:any;
  @Input() squareUniqueId:number|undefined;
  @Input() isSelected:boolean = false;
  @Input() isHidden:boolean=false;
}
