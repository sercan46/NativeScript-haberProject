import { Component, OnInit } from "@angular/core";
import { RegisterService } from "./register.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
    constructor(
        public service: RegisterService,
        public router: Router,
        public routerExtensions: RouterExtensions
    ) {}
    girisName = "";
    giriSifre = "";
    myData: any;
    jsonData: any;
    controlDegerler: any;
    ngOnInit() {}
    async kaydol() {
        this.myData = {
            email: this.girisName,
            password: this.giriSifre,
        };
        this.jsonData = JSON.stringify(this.myData);
        console.log("jsonData", this.jsonData);

        let servistenGelen = await this.service.getSifre(this.jsonData);
        console.log("servisten", servistenGelen);
        if (servistenGelen != undefined) {
            if (servistenGelen["userStatus"]) {
                dialogs
                    .alert({
                        title: "Üyelik Oluşturuldu!",
                        message:
                            "Lütfen Giriş Yapabilmek İçin Mailinize Gelen E-Postayı Onaylayın.",
                        okButtonText: "Tamam",
                    })
                    .then((x) => {
                        console.log("x", x);
                        this.router.navigate(["items"]);
                    });
            }
        } else {
        }
    }
    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
