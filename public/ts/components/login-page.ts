import { Component, Inject } from "angular2/core";
import { NgFor } from "angular2/common";
import { Http, HTTP_PROVIDERS } from "angular2/http";
import { InputComponent, ButtonComponent } from "feel-ui/feel-ui"
import "rxjs/rx";

@Component({
    directives: [ InputComponent, ButtonComponent ],
    providers: [ HTTP_PROVIDERS ],
    selector: "login-page",
    template: `<form id="login-form">
                  <feel-input [(value)]=username [label]="'Username'"></feel-input>{{username}}
                  <feel-input type="password" [(value)]=password [label]="'Password'"></feel-input>
                  <feel-button text="Sign in"></feel-button>
               </form>`
})
export class LoginPage {
   public username: string;
   public password: string;

   public constructor() {
   }
}
