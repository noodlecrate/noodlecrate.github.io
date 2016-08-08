import { Component, Inject, provide } from "@angular/core";
import { NgIf } from "@angular/common";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { Http, HTTP_PROVIDERS } from "@angular/http";
import "rxjs/Rx";
import { HomePage } from "./home-page";
import { LoginPage } from "./login-page";
import { NotFoundPage } from "./not-found-page";
import { ViewReviewPage } from "./view-review-page";
import { ManageReviewPage } from "./admin/manage-review";
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES } from "@angular/router";
import { UserChip } from "./user-chip";
import { CurrentUserProvider } from "../providers/current-user-provider";
import * as Constants from "../constants";

const routes: RouterConfig = [
    { path: "", component: HomePage },
    { path: "login", component: LoginPage },
    { path: "not-found", component: NotFoundPage },
    { path: "review/:reviewId", component: ViewReviewPage },
    { path: "admin/edit-review/:reviewId", component: ManageReviewPage },
    { path: "admin/create-review", component: ManageReviewPage }
];

@Component({
    directives: [ ROUTER_DIRECTIVES, UserChip, NgIf ],
    providers: [ CurrentUserProvider, HTTP_PROVIDERS ],
    selector: "noodle-crate-app",
    template: `<header>
                  <h1 [routerLink]="['HomePage']">NoodleCrate</h1>
                  <user-chip *ngIf=_currentUser [user]=_currentUser></user-chip>
               </header>
               <router-outlet></router-outlet>`
})
class SiteContainer {

  private _currentUser: any;
  private _currentUserProvider: CurrentUserProvider;

  public constructor(@Inject(CurrentUserProvider) currentUserProvider: CurrentUserProvider) {
      this._currentUserProvider = currentUserProvider;

     let request = new XMLHttpRequest();

     request.open("GET", Constants.API_URL + "/users/current");

     request.setRequestHeader("Content-Type", "application/json");
     request.withCredentials = true;

     request.onreadystatechange = () => {
          if (request.readyState === XMLHttpRequest.DONE) {
             if (request.status === 200) {
                this._currentUser = JSON.parse(request.responseText);
                this._currentUserProvider.cacheCurrentUser(this._currentUser);
             }
          }
      };

      request.send();
  }
}
bootstrap(SiteContainer, [ provideRouter(routes) ]).catch(err => console.error(err));
