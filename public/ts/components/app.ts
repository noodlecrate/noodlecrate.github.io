import { Component, Inject, provide } from "angular2/core";
import { NgFor } from "angular2/common";
import { bootstrap } from "angular2/platform/browser";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/rx";
import { HomePage } from "./home-page";
import { ViewReviewPage } from "./view-review-page";
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";

@Component({
    directives: [ ROUTER_DIRECTIVES ],
    selector: "noodle-crate-app",
    template: `<header>
                  <h1>Noodle Crate</h1>
               </header>
               <router-outlet></router-outlet>`
})
@RouteConfig([
    { path: "/", component: HomePage, name: "HomePage", useAsDefault: true },
    { path: "/review/:reviewId", component: ViewReviewPage, name: "ViewReviewPage" }
])
class SiteContainer {
}
bootstrap(SiteContainer, ROUTER_PROVIDERS);
