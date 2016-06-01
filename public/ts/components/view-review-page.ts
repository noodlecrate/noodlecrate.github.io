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
                  <h2>{{review.title}}</h2>
                  <div>{{review.body}}</div>
               </article>`
})
export class ViewReviewPage {
   private review: Object = {};

   public constructor(@Inject(Http) http: Http, @Inject(RouteParams) routeParams: RouteParams) {
      http
         .get("http://localhost:3000/reviews/" + routeParams.get("reviewId"))
         .map(x => x.json())
         .subscribe(review => {
            this.review = review;
         });
   }
}
