import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class NewsService {
    xmlFonksiyon: any;
    constructor(public http: HttpClient) {}

    fetchHaberService(): any {
        return this.http
            .get("https://www.aa.com.tr/tr/rss/default?cat=guncel", {
                responseType: "text",
            })
            .pipe(
                map((response) => {
                    this.xmldenAl(response);
                    return response;
                })
            );
    }
    xmldenAl(xML) {
        let res;

        var parseString = require("nativescript-xml2js").parseString;
        var xml = xML;
        parseString(xml, function (err, result) {
           res= result;
        });
        this.xmlFonksiyon=res
        return this.xmlFonksiyon
    }
}
