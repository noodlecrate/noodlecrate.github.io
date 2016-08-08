import { Component, Inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { Http, HTTP_PROVIDERS, Headers } from "@angular/http";
import "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonComponent, InputComponent, NotificationProvider } from "feel-ui/feel-ui";
import { CurrentUserProvider } from "../../providers/current-user-provider";
import { ReviewRepository } from "../../respositories/review-repository";
import * as Constants from "../../constants";

@Component({
    directives: [ NgFor, ButtonComponent, InputComponent ],
    providers: [ HTTP_PROVIDERS, CurrentUserProvider, ReviewRepository ],
    selector: "view-review-page",
    template: `<article>
                  <feel-input [(value)]=_review.title [label]="'Title'"></feel-input>
                  <feel-input [(value)]=_review.body [multiline]=true [label]="'Body'"></feel-input>
                  <feel-input [(value)]=_review.imageUrl [label]="'Image URL'"></feel-input>
               </article>
               <feel-button (click)="saveReview()" [text]="'Save'"></feel-button>`
})
export class ManageReviewPage {
   private _review: any = {};

   public constructor( route: ActivatedRoute, private _router: Router, private _currentUserProvider: CurrentUserProvider, private _reviewRepository: ReviewRepository) {

      if (!this._currentUserProvider.getCurrentUser()) {
         this._router.navigate(["LoginPage"]);
      }

      let me = this;
      if ( (<any>route.params).reviewId ) {
         this._getReview(parseInt( (<any>route.params).reviewId ));
      }
   }

   private async _getReview(reviewId: number) {
      this._review = await this._reviewRepository.getReviewById(reviewId);
   }

   public saveReview() {

      this._review.authorId = this._currentUserProvider.getCurrentUser().id;

      let request = new XMLHttpRequest();

      if (this._review.id) {
         request.open("PUT", Constants.API_URL + "/reviews/" + this._review.id);
      }
      else {
         request.open("POST", Constants.API_URL + "/reviews");
      }

      request.setRequestHeader("Content-Type", "application/json");
      request.withCredentials = true;

      request.onreadystatechange = () => {
           if (request.readyState === XMLHttpRequest.DONE) {
               if (request.status === 200 || request.status === 201) {
                  this._review.id = JSON.parse(request.responseText).id;
                   new NotificationProvider().showSuccess("Hooray", "It's been saved");
               }
               else if (request.status === 401) {
                  new NotificationProvider().showError("Not logged in", "no deal, bra");
                  this._currentUserProvider.cacheCurrentUser(null);
                  this._router.navigate(["LoginPage"]);
               }
               else {
                   new NotificationProvider().showError("Boo", "Something went wrong");
               }
           };
       };

       request.send(JSON.stringify(this._review));
   }
}
