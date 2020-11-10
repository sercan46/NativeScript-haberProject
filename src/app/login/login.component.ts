import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginService } from "./login.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    constructor(
        public router: Router,
        public service: LoginService,
        public routerExtensions: RouterExtensions
    ) {}
    userName = "";
    password = "";

    c = "";

    registermyData: any;
    registerjsonData: any;
    email: any;
    userToken: any;
    ngOnInit() {}
    kayitOl() {
        this.router.navigate(["register"]);
    }

    async registeredUser() {
        this.registermyData = {
            login: this.userName,
            password: this.password,
        };
        this.registerjsonData = JSON.stringify(this.registermyData);
        console.log("jsonData", this.registerjsonData);

        let asd = await this.service.getGiris(this.registerjsonData);
        console.log("let asd", asd);
        this.userToken = asd["user-token"];

        let tokenControl = await this.service.tokenControl(this.userToken);
        console.log("tokenControl", tokenControl);

        if (tokenControl == true) {
            this.router.navigate(["haber"]);
        } else {
            console.log("asdasd");
            dialogs
                .alert({
                    title: "Başarısız!",
                    message: "Şifreniz Hatalı Tekrar Giriniz",
                    okButtonText: "Tamam",
                })
                .then(function () {
                    console.log("Dialog closed!");
                });
        }
    }
    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
