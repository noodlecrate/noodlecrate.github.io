import { Component, Input, Output, EventEmitter } from "angular2/core";
import { NgClass, NgModel, NgIf } from "angular2/common";
@Component({
    directives: [NgClass, NgIf],
    selector: "feel-input",
    template: `<label>{{label}}</label>
               <textarea *ngIf="multiline" [ngModel]=value (ngModelChange)="onInput($event)" [rows]=_rows></textarea>
               <input *ngIf="!multiline" [type]=type [ngModel]=value (ngModelChange)="onInput($event)" />`
})
export class InputComponent {

   @Input() label: string;
   @Input() value: string;
   @Input() multiline: boolean = false;
   @Input() type: string = "text";
   @Output() valueChange = new EventEmitter();

   private _rows: number = 2;

   onInput(event: string) {

      this.value = event;
      this.valueChange.emit(event);

      let rows = this.value.split("\n").length;

      if (rows < 2) {
         rows = 2;
      }

      this._rows = rows;
   }
 }
