import { Component, Input } from "angular2/core";
import { RouteParams, ROUTER_DIRECTIVES } from "angular2/router";

@Component({
   directives: [ ROUTER_DIRECTIVES ],
   selector: "article-summary",
   template: `
            <section class="image">
               <img src="{{review.imageUrl}}" />
            </section>
            <article>
               <h2>{{review.title}} <small>by {{review.author.firstName}} {{review.author.lastName[0]}}</small></h2>
               <div>{{review.body}}</div>
               <a [routerLink]="['ViewReviewPage', { reviewId: review.id }]">Read more</a>
            </article>`
})
export class ArticleSummary {
   @Input()
   private review: any;
}
