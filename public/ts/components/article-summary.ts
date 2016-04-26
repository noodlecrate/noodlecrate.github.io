import { Component, Input } from "angular2/core";

@Component({
   selector: "article-summary",
   template: `
            <section class="image">
                <img src="{{noodle.image.thumb}}">
            </section>
            <article>
               <h2>{{noodle.name}}</h2>
              <h4>{{noodle.description}}</h4>
              <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Duis ac nulla et purus rutrum euismod vitae nec libero.
                 Aliquam quis enim nec eros hendrerit pretium eu eget lacus.
              </p>
              <p>
                 Fusce sit amet tempor ligula, sit amet laoreet ligula.
                 Vestibulum sem diam, hendrerit ac interdum et, luctus porta elit.
                 Nullam gravida posuere auctor.
              </p>
              <p>
                 Maecenas ullamcorper venenatis sem a sagittis.
                 Vestibulum suscipit placerat.
              </p>
              </article>`
})
export class ArticleSummary {
   @Input()
   private noodle: any;
}
