import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "angular2/core";
import { NgModel } from "angular2/common";
@Component({
    directives: [  ],
    selector: "feel-slider",
    template: `<div class="slider-track">
                  <div class="slider-button" [style.left]="_getOffset()" (mousedown)="_startDrag($event)"></div>
               </div>`
})
export class Slider {

   @Input()
   value: number;

   @Output()
   valueChange = new EventEmitter();

   private _offset: string = "20%";
   private _getOffset() {
     return this._offset;
   }

   private _buttonElement: HTMLElement;

   @Input()
   maximum: number;

   constructor() {
      this._calculateOffset();
   }

   private _calculateOffset() {
      this._offset = ((this.value / this.maximum) * 100).toString() + "%";
   }

   private _startDrag(event: MouseEvent) {
      this._buttonElement = <HTMLElement>event.target;

      document.onmouseup = this._stopDrag.bind(this);
      document.onmousemove = this._handleDrag.bind(this);
   }

   private _handleDrag(event: MouseEvent) {
      let element = this._buttonElement;
      let offsetTotal = this._buttonElement.offsetLeft;

      while (element = <HTMLElement>element.offsetParent) {
         if (!isNaN(element.offsetLeft)) {
            offsetTotal += element.offsetLeft;
         }
      }

      let value = (event.pageX / this._buttonElement.parentElement.offsetWidth) * this.maximum;

      if (value < 0) {
         this.value = 0;
      }
      else if (value > this.maximum) {
         this.value = this.maximum;
      }
      else {
         this.value = value;
      }

      this._calculateOffset();
      this._buttonElement.style.left = this._offset;
      //console.log(this.value);

      event.preventDefault();

      this.valueChange.next(this.value);
   }

   private _stopDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
   }
 }
