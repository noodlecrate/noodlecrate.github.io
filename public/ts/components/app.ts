import { Component, Inject, provide } from "angular2/core";
import { APP_BASE_HREF } from "angular2/platform/common";
import { NgIf } from "angular2/common";
import { bootstrap } from "angular2/platform/browser";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/Rx";
import { HomePage } from "./home-page";
import { LoginPage } from "./login-page";
import { NotFoundPage } from "./not-found-page";
import { ViewReviewPage } from "./view-review-page";
import { ManageReviewPage } from "./admin/manage-review";
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { UserChip } from "./user-chip";
import { CurrentUserProvider } from "../providers/current-user-provider";

@Component({
    directives: [ ROUTER_DIRECTIVES, UserChip, NgIf ],
    providers: [ CurrentUserProvider ],
    selector: "noodle-crate-app",
    template: `<header>
                  <h1 [routerLink]="['HomePage']">NoodleCrate</h1>
                  <user-chip *ngIf=_currentUser [user]=_currentUser></user-chip>
               </header>
               <router-outlet></router-outlet>`
})
@RouteConfig([
    { path: "/", component: HomePage, name: "HomePage" },
    { path: "/login", component: LoginPage, name: "LoginPage" },
    { path: "/not-found", component: NotFoundPage, name: "NotFoundPage", useAsDefault: true },
    { path: "/review/:reviewId", component: ViewReviewPage, name: "ViewReviewPage" },
    { path: "/admin/edit-review/:reviewId", component: ManageReviewPage, name: "EditReviewPage" },
    { path: "/admin/create-review", component: ManageReviewPage, name: "CreateReviewPage" }
])
class SiteContainer {

  private _currentUser: any;

  public constructor(@Inject(CurrentUserProvider) private _currentUserProvider: CurrentUserProvider) {
     let request = new XMLHttpRequest();

     request.open("GET", "http://pp050:3000/users/current");

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
bootstrap(SiteContainer, [ ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: "/"}) ]);
