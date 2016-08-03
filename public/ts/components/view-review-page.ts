import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { ArticleSummary } from "./article-summary";
import { HTTP_PROVIDERS } from "@angular/http";
import { RouteSegment, ROUTER_DIRECTIVES } from "@angular/router";
import { ReviewRepository } from "../respositories/review-repository";

@Component({
    directives: [ NgFor, ArticleSummary, ROUTER_DIRECTIVES ],
    providers: [ ReviewRepository, HTTP_PROVIDERS ],
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
      this._review = await this._reviewRepository.getReviewById(reviewId);
   }
}
