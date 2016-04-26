import { Component, provide, Injectable } from "angular2/core";
import {bootstrap}    from "angular2/platform/browser";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import "rxjs/rx";

@Component({
    providers: [ HTTP_PROVIDERS ],
    selector: "noodle-crate-app",
    template: `<router-outlet></router-outlet>`
})
@Injectable()
class SiteContainer {
   public constructor(http: Http) {
      http
         .get("http://localhost:3000/noodles/")
         .map(x => x.json())
         .subscribe(noodles => console.log(noodles));
   }
}
bootstrap(SiteContainer);
