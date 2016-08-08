import { Component, Input, Inject } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
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

    private _currentUserProvider: CurrentUserProvider;

   public constructor (@Inject(CurrentUserProvider) currentUserProvider: CurrentUserProvider) {
       this._currentUserProvider = currentUserProvider;
   }

   @Input("user")
   private _user: any;

   private async _logout() {
      await this._currentUserProvider.logout();
      this._user = null;
   }
}
