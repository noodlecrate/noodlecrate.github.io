import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import "rxjs/Rx";

@Injectable()
export class CurrentUserProvider {

   public constructor(private _http: Http) { }

   public getCurrentUser(): any {
      return JSON.parse(localStorage.getItem("current user"));
   }

   public cacheCurrentUser(user: any): void {
      localStorage.setItem("current user", JSON.stringify(user));
   }

   public async logout(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
         this._http
            .delete("http://PP050:3000/logout")
            .subscribe(() => {
               this.cacheCurrentUser(null);
               resolve();
            });
      });
   }
}
