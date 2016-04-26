import { Component, Input, EventEmitter } from "angular2/core";
import { NgClass } from "angular2/common";
import { ButtonComponent } from "./button";
import { RouterLink } from 'angular2/router';
@Component({
    directives: [NgClass, ButtonComponent, RouterLink ],
    selector: "feel-menu-panel",
    events: ['close'],
    template: `<div [ngClass]=\"{ 'show': open }\" >
                  <div class="menu-title">
                    <h1>Menu</h1>
                    <feel-button [text]="'X'" (click)=closeMenuPanel()></feel-button>
                  </div>
                  <div class="menu-options">
                    <a [routerLink]="['/Home']"><div class="menu-item">Home</div></a>
                    <a [routerLink]="['/Buttons']"><div class="menu-item">Button</div></a>
                    <a [routerLink]="['/Input']"><div class="menu-item">Input</div></a>
                    <a [routerLink]="['/Notifications']"><div class="menu-item">Notifications</div></a>
                    <a [routerLink]="['/Table']"><div class="menu-item">Table</div></a>
                    <a [routerLink]="['/Slider']"><div class="menu-item">Slider</div></a>
                  </div>
               </div>`
})
export class MenuPanel {

   @Input() open: boolean;
   close = new EventEmitter();

   constructor() {
   }

   public closeMenuPanel() {
     this.open = false;
     this.close.next(null);
   }
 }
