import { Component, Inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { Http, HTTP_PROVIDERS, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { InputComponent, ButtonComponent, NotificationProvider } from "feel-ui/feel-ui";
import { CurrentUserProvider } from "../providers/current-user-provider";
import "rxjs/Rx";
import * as Constants from "../constants";

@Component({
    directives: [ InputComponent, ButtonComponent ],
    providers: [ HTTP_PROVIDERS, CurrentUserProvider ],
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
   private _router: Router;

   public constructor(@Inject(Http) http: Http, @Inject(Router) router: Router, @Inject(CurrentUserProvider) private _currentUserProvider: CurrentUserProvider)  {
     this._http = http;
     this._router = router;

     if (this._currentUserProvider.getCurrentUser()) {
        this._router.navigate(["CreateReviewPage"]);
     }
   }

   public signIn() {

      let request = new XMLHttpRequest();
      request.open("POST", Constants.API_URL + "/session");

      request.setRequestHeader("Content-Type", "application/json");
      request.withCredentials = true;

      request.onreadystatechange = () => {
           if (request.readyState === XMLHttpRequest.DONE) {
               if (request.status === 200 || request.status === 201) {
                   new NotificationProvider().showSuccess("Hooray", "you got it right");
                   request.open("GET", Constants.API_URL + "/users/current");

                  request.setRequestHeader("Content-Type", "application/json");
                  request.withCredentials = true;

                  request.onreadystatechange = () => {
                       if (request.readyState === XMLHttpRequest.DONE) {
                          if (request.status === 200) {
                              this._currentUserProvider.cacheCurrentUser(JSON.parse(request.responseText));
                              this._router.navigate(["CreateReviewPage"]);
                          }
                       }
                   };

                   request.send();
               }
               else {
                   new NotificationProvider().showError("Boo", "you got it wrong");
               }
           };
       };

      request.send(JSON.stringify({ username: this.username, password: this.password }));
   }
}
