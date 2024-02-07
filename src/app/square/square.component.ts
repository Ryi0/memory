import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-square',
  template: `
    <div>
      {{ cardContent }}
    </div>

  `,
  styleUrl: './square.component.scss'
})

export class SquareComponent {
  @Input() cardContent:any;
  @Input() squareUniqueId:number|undefined;
  // uniqueId:number = 0; //try to use it only as gui
  //
  // private static id:number = 0;
  //
  // ngOnInit(): void {
  //   this.uniqueId = SquareComponent.id;
  //   SquareComponent.id++;
  // }



}
