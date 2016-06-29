import { Component, Inject, provide } from "angular2/core";
import { APP_BASE_HREF } from "angular2/platform/common";
import { NgFor } from "angular2/common";
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

@Component({
    directives: [ ROUTER_DIRECTIVES, UserChip ],
    selector: "noodle-crate-app",
    template: `<header>
                  <h1 [routerLink]="['HomePage']">Noodle Crate</h1>
                  <user-chip [user]=currentUser></user-chip>
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
  currentUser = { firstName: "James", lastName: "Richford", imageUrl: "https://avatars2.githubusercontent.com/u/8244919?v=3&s=460" };
}
bootstrap(SiteContainer, [ ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: '/'}) ]);
