import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS, Headers } from "angular2/http";
import "rxjs/Rx";
import { RouteParams, Router } from "angular2/router";
import { ButtonComponent, InputComponent, NotificationProvider } from "feel-ui/feel-ui";
import { CurrentUserProvider } from "../../providers/current-user-provider";

@Component({
    directives: [ NgFor, ButtonComponent, InputComponent ],
    providers: [ HTTP_PROVIDERS, CurrentUserProvider ],
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
   private _router: Router;

   public constructor(@Inject(Http) http: Http, @Inject(RouteParams) routeParams: RouteParams, @Inject(Router) router: Router, @Inject(CurrentUserProvider) private _currentUserProvider: CurrentUserProvider) {

      this._http = http;
      this._router = router;

      if (!this._currentUserProvider.getCurrentUser()) {
         this._router.navigate(["LoginPage"]);
      }

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

      this._review.authorId = this._currentUserProvider.getCurrentUser().id;

      let request = new XMLHttpRequest();

      if (this._review.id) {
         request.open("PUT", "http://pp050:3000/reviews/" + this._review.id);
      }
      else {
         request.open("POST", "http://pp050:3000/reviews");
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
