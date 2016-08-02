import { Injectable } from "angular2/core";

@Injectable()
export class CurrentUserProvider {
   public getCurrentUser(): any {
      return JSON.parse(localStorage.getItem("current user"));
   }

   public cacheCurrentUser(user: any): void {
      localStorage.setItem("current user", JSON.stringify(user));
   }
}
