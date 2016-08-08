import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/Rx";
import * as Constants from "../constants";

@Injectable()
export class CurrentUserProvider {

    private _http: Http;

   public constructor(@Inject(Http) http: Http) {
       this._http = http;
   }

   public getCurrentUser(): any {
      return JSON.parse(localStorage.getItem("current user"));
   }

   public cacheCurrentUser(user: any): void {
      localStorage.setItem("current user", JSON.stringify(user));
   }

   public async logout(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
         this._http
            .delete(Constants.API_URL + "/logout", {})
            .subscribe(() => {
               this.cacheCurrentUser(null);
               resolve();
            });
      });
   }
}
