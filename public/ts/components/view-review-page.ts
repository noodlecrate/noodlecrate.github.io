import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/Rx";
import { ArticleSummary } from "./article-summary";
import { RouteParams } from "angular2/router";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ HTTP_PROVIDERS ],
    selector: "view-review-page",
    template: `<article>
                  <img src="{{_review.imageUrl}}" />
                  <h2>{{_review.title}}</h2>
                  <div>{{_review | json}}</div>
                  <div>{{_review.body}}</div>
               </article>`
})
export class ViewReviewPage {
   private _review: Object = {};

   public constructor(@Inject(Http) http: Http, @Inject(RouteParams) routeParams: RouteParams) {
      http
         .get("http://PP050:3000/reviews/" + routeParams.get("reviewId"))
         .map(x => x.json())
         .subscribe(review => {
            this._review = review;
         });
   }
}
