import { Component, Input } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { CurrentUserProvider } from "../providers/current-user-provider";

@Component({
   providers: [ HTTP_PROVIDERS, CurrentUserProvider ],
   selector: "user-chip",
   template: `
             <span>{{_user.firstName}} {{_user.lastName}} &#x25BC;</span>
             <span (click)="_logout()">logout</span>
             <img src="{{_user.profileImage}}"/>`
})
export class UserChip {

   public constructor (private _currentUserProvider: CurrentUserProvider) {}

   @Input("user")
   private _user: any;

   private async _logout() {
      await this._currentUserProvider.logout();
      this._user = null;
   }
}
