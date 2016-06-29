import { Component, Input } from "angular2/core";

@Component({
   selector: "user-chip",
   template: `
             <span>{{user.firstName}} {{user.lastName}} &#x25BC;</span>
             <img src="{{user.imageUrl}}"/>`
})
export class UserChip {
   @Input()
   public user: any;
}
