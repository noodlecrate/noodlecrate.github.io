import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/Rx";
import { ArticleSummary } from "./article-summary";

@Component({
    directives: [ NgFor, ArticleSummary ],
    providers: [ HTTP_PROVIDERS ],
    selector: "home-page",
    template: `<article-summary *ngFor="let review of _reviews" [review]="review"></article-summary>`
})
export class HomePage {
    private _reviews: Array<any>;

    public constructor(@Inject(Http) http: Http) {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/reviews");

        request.setRequestHeader('Content-Type', 'application/json');
        request.withCredentials = true;

        request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE && request.status == 200) {
                this._reviews = JSON.parse(request.responseText);
            }
        }

        request.send();

        /*
      http
         .get("http://localhost:3000/reviews")
         .map(x => x.json())
         .subscribe(reviews => {
            this._reviews = reviews;
         });
         */
   }
}
