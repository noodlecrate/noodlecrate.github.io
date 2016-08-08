import { Injectable, Inject } from "@angular/core";
import { ReviewModel } from "../models/review-model";
import { Http, HTTP_PROVIDERS } from "@angular/http";
import "rxjs/Rx";
import * as Constants from "../constants";

@Injectable()
export class ReviewRepository {

    private _http: Http;

   public constructor(@Inject(Http) http: Http) {
       this._http = http;
   }

   public async getReviewById(reviewId: number): Promise<ReviewModel> {
      return new Promise<ReviewModel>((resolve, reject) => {
         this._http
            .get(Constants.API_URL + "/reviews/" + reviewId)
            .map(response => response.json())
            .subscribe(review => {
               resolve(review);
            });
      });
   }

   public async getReviews(): Promise<Array<ReviewModel>> {
      return new Promise<Array<ReviewModel>>((resolve, reject) => {
         this._http
            .get(Constants.API_URL + "/reviews")
            .map(response => response.json())
            .subscribe(reviews => {
               resolve(reviews);
            });
      });

   }
}
