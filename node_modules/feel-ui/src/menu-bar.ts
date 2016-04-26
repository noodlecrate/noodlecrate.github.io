import { Component, Input } from "angular2/core";
import { ButtonComponent } from "./button";
import { MenuPanel } from "./menu-panel";
@Component({
    directives: [ ButtonComponent, MenuPanel ],
    selector: "feel-menu-bar",
    template: `<feel-button [text]="'M'" (click)=toggleMenuPanel()></feel-button>
               <div class="title">
                <h1>{{title}}</h1>
                </div>
               <feel-menu-panel [open]="isMenuOpen" (close)="onMenuClose()"></feel-menu-panel>`
})
export class MenuBar {

   @Input() title: string;
   public isMenuOpen: boolean;

   public constructor() {
     this.isMenuOpen = false;
   }

   public toggleMenuPanel() {
     this.isMenuOpen = !this.isMenuOpen
   }

   public onMenuClose(): void {
      this.isMenuOpen = false;
   }
 }
