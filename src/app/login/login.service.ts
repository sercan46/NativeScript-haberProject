import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable({ providedIn: "root" })
export class LoginService {
    constructor(private httpService: HttpClient) {}
    error: any;
    registerUrlLink: string =
        "https://api.backendless.com/CB7D877B-B9B8-678E-FFFF-EAC4A8422C00/1A018C39-833A-481E-823E-E83909170095/users/login";
    tokenUrl: string =
        "https://api.backendless.com/CB7D877B-B9B8-678E-FFFF-EAC4A8422C00/1A018C39-833A-481E-823E-E83909170095/users/isvalidusertoken/";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    async getGiris(paramsData: any) {
        let x = await this.httpService
            .post(this.registerUrlLink, paramsData, this.httpOptions)
            .toPromise()
            .catch((err) => {
                console.log("errrrrrr", err);
                this.error = err.error;
                // return false;
            });
        console.log("this.error", this.error);
        if (this.error) {
            if (this.error.code == 3087) {
                dialogs
                    .alert({
                        title: "Başarısız!",
                        message: "Lütfen Emailinizi gelen kodu onaylayınız",
                        okButtonText: "Tamam",
                    })
                    .then((x) => {
                        this.error = "";
                    });
            }
            if (this.error.code == 3003) {
                dialogs
                    .alert({
                        title: "Başarısız!",
                        message: "Kullanıcı Adı Veya Şifre Hatalı",
                        okButtonText: "Tamam",
                    })
                    .then((x) => {
                        this.error = "";
                    });
            }
            if (this.error.code == 3006) {
                dialogs
                    .alert({
                        title: "Başarısız!",
                        message: "Lütfen Gerekli Alanları Doldurunuz",
                        okButtonText: "Tamam",
                    })
                    .then((x) => {
                        this.error = "";
                    });
            }
        } else {
            return x;
        }
    }
    async tokenControl(tokenData) {
        console.log("Token Service Gelen Parametre", tokenData);
        let d = await this.httpService
            .get(this.tokenUrl + tokenData)
            .toPromise();
        return d;
    }
}
