import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS, Headers } from "angular2/http";
import "rxjs/Rx";
import { RouteParams } from "angular2/router";
import { ButtonComponent, InputComponent, NotificationProvider } from "feel-ui/feel-ui";

@Component({
    directives: [ NgFor, ButtonComponent, InputComponent ],
    providers: [ HTTP_PROVIDERS ],
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
   private _http: Http;

   public constructor(@Inject(Http) http: Http, @Inject(RouteParams) routeParams: RouteParams) {

      this._http = http;
      let me = this;
      if (routeParams.get("reviewId")) {

         http
            .get("http://pp050:3000/reviews/" + routeParams.get("reviewId"))
            .map(x => x.json())
            .subscribe(review => {
               me._review = review;
            });
      }
   }

   public saveReview() {

      this._review.author = { id: 2 };

      let request = new XMLHttpRequest();

      if (this._review.id) {
         request.open("PUT", "http://pp050:3000/reviews/" + this._review.id);
      }
      else {
         request.open("POST", "http://pp050:3000/reviews");
      }

      request.setRequestHeader('Content-Type', 'application/json');
      request.withCredentials = true;

      request.onreadystatechange = function () {
           if (request.readyState === XMLHttpRequest.DONE) {
               if (request.status == 200 || request.status == 201) {
                  this._review.id = JSON.parse(request.responseText).id;
                   new NotificationProvider().showSuccess("Hooray", "It's been saved");
               }
               else {
                   new NotificationProvider().showError("Boo", "Something went wrong");
               }
           };
       };

       request.send(JSON.stringify(this._review));
   }
}
