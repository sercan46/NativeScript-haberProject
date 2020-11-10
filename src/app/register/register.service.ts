import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { loginData } from "../login/loginData";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class RegisterService {
    constructor(private httpService: HttpClient,        public router: Router,
        ) {}
    error: any;
    urlLink: string =
        "https://api.backendless.com/CB7D877B-B9B8-678E-FFFF-EAC4A8422C00/1A018C39-833A-481E-823E-E83909170095/users/register";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };
    async getSifre(params: loginData) {
        console.log("kayıt için gelen data", params);
        let getServis = await this.httpService
            .post(this.urlLink, params, this.httpOptions)
            .toPromise()
            .catch((err) => {
                console.log("errrrrrr", err);
                this.error = err.error;
                return false;
            });
            console.log("this.error",this.error)


            if(this.error){
                console.log("cccc")
        if (this.error.code == 3041) {
            dialogs.alert({
                title: "Başarısız!",
                message: "Lütfen Şifrenizi Geçerli Giriniz",
                okButtonText: "Tamam",
            });
        }  if (this.error.code == 3040) {
            dialogs.alert({
                title: "Başarısız!",
                message: "Lütfen Emailinizi Geçerli Giriniz",
                okButtonText: "Tamsam",
            }) .then((x) => {
                this.error='';
            });;
        }  if (this.error.code == 3033) {
            console.log("aaaa")
            dialogs.alert({
                title: "Başarısız!",
                message: "Bu Mail Adına Daha Önce Üyelik Alınmıştır",
                okButtonText: "Tamam",
            });
        }
    }
    else{            return getServis;
    }

    }
}
