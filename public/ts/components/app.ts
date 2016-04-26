import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { bootstrap } from "angular2/platform/browser";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/rx";
import { ArticleSummary } from "./article-summary";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ HTTP_PROVIDERS ],
    selector: "noodle-crate-app",
    template: `<article-summary *ngFor="#noodle of _noodles" [noodle]="noodle"></article-summary>`
})
class SiteContainer {
   private _noodles: Array<any>;

   public constructor(@Inject(Http) http: Http) {
      http
         .get("http://localhost:3000/noodles/")
         .map(x => x.json())
         .subscribe(noodles => {
            this._noodles = noodles;
         });
   }
}
bootstrap(SiteContainer);
