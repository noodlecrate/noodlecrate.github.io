import { Component } from "angular2/core";
import { NgFor } from "angular2/common";
import { ArticleSummary } from "./article-summary";
import { HTTP_PROVIDERS } from "angular2/http";
import { RouteParams, ROUTER_PROVIDERS } from "angular2/router";
import { ReviewRepository } from "../respositories/review-repository";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ ROUTER_PROVIDERS, ReviewRepository, HTTP_PROVIDERS ],
    selector: "view-review-page",
    template: `<article>
                  <img src="{{_review.imageUrl}}" />
                  <h2>{{_review.title}}</h2>
                  <div>{{_review.body}}</div>
               </article>`
})
export class ViewReviewPage {
   private _review: Object = {};

   public constructor(routeParams: RouteParams, private _reviewRepository: ReviewRepository) {
      this._getReview(parseInt(routeParams.get("reviewId")));
   }

   private async _getReview(reviewId: number) {
      this._review = await this._reviewRepository.getById(reviewId);
   }
}
