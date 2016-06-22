import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS, Headers } from "angular2/http";
import { InputComponent, ButtonComponent, NotificationProvider } from "feel-ui/feel-ui"
import "rxjs/Rx";

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

   public constructor(@Inject(Http) http: Http) {
     this._http = http;
   }

   public signIn() {

      let request = new XMLHttpRequest();
      request.open("POST", "http://pp050:3000/session");

      request.setRequestHeader('Content-Type', 'application/json');
      request.withCredentials = true;

      request.onreadystatechange = function () {
           if(request.readyState === XMLHttpRequest.DONE) {
               if (request.status == 200 || request.status == 201) {
                   new NotificationProvider().showSuccess("Hooray", "you got it right");
               }
               else {
                   new NotificationProvider().showError("Boo", "you got it wrong");
               }
           };
       };

      request.send(JSON.stringify({ username: this.username, password: this.password }));
   }
}
