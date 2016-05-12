import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/rx";
import { ArticleSummary } from "./article-summary";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ HTTP_PROVIDERS ],
    selector: "home-page",
    template: `<article-summary *ngFor="#review of _reviews" [review]="review"></article-summary>`
})
export class HomePage {
   private _reviews: Array<any>;

   public constructor(@Inject(Http) http: Http) {
      http
         .get("http://localhost:3000/reviews")
         .map(x => x.json())
         .subscribe(reviews => {
            this._reviews = reviews;
         });
   }
}
