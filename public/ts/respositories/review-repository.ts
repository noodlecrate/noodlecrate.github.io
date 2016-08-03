import { Injectable, Inject } from "angular2/core";
import { ReviewModel } from "../models/review-model";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/Rx";

@Injectable()
export class ReviewRepository {

   public constructor(private _http: Http) { }

   public async getReviewById(reviewId: number): Promise<ReviewModel> {
      return new Promise<ReviewModel>((resolve, reject) => {
         this._http
            .get("http://PP050:3000/reviews/" + reviewId)
            .map(response => response.json())
            .subscribe(review => {
               resolve(review);
            });
      });
   }

   public async getReviews(): Promise<Array<ReviewModel>> {
      return new Promise<Array<ReviewModel>>((resolve, reject) => {
         this._http
            .get("http://PP050:3000/reviews")
            .map(response => response.json())
            .subscribe(reviews => {
               resolve(reviews);
            });
      });

   }
}
