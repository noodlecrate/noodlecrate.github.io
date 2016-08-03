import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { Http, HTTP_PROVIDERS } from "@angular/http";
import { ArticleSummary } from "./article-summary";
import { ReviewRepository } from "../respositories/review-repository";
import "rxjs/Rx";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ HTTP_PROVIDERS, ReviewRepository ],
    selector: "home-page",
    template: `<article-summary *ngFor="let review of _reviews" [review]="review"></article-summary>`
})
export class HomePage {
    private _reviews: Array<any>;

    public constructor(private _reviewRepository: ReviewRepository) {
      this._getReviews();
   }

   private async _getReviews() {
      this._reviews = await this._reviewRepository.getReviews();
   }
}
