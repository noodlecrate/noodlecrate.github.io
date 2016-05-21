import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS, Headers } from "angular2/http";
import { InputComponent, ButtonComponent, NotificationProvider } from "feel-ui/feel-ui"
import "rxjs/rx";

@Component({
    directives: [ InputComponent, ButtonComponent ],
    providers: [ HTTP_PROVIDERS ],
    selector: "login-page",
    template: `<form id="login-form">
                  <feel-input [(value)]=username [label]="'Username'"></feel-input>
                  <feel-input type="password" [(value)]=password [label]="'Password'"></feel-input>
                  <feel-button text="Sign in" type="submit" primary=true (click)=signIn()></feel-button>
               </form>`
})
export class LoginPage {
   public username: string;
   public password: string;
   private _http: Http;

   public constructor(http: Http) {
     this._http = http;
   }

   public signIn() {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');

     this._http.post("http://localhost:3000/session",
        JSON.stringify({ username: this.username, password: this.password }),
      { headers: headers })
     .subscribe(() => {
       new NotificationProvider().showSuccess("Hooray", "you got it right");
     },
     () => {
       new NotificationProvider().showError("Boo", "you got it wrong");
     });
   }
}
