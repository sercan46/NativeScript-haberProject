import { Component, OnInit } from "@angular/core";
import { NewsService } from "./news-container.service";
import { map } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-news-container",
    templateUrl: "./news-container.component.html",
    styleUrls: ["./news-container.component.css"],
})
export class NewsContainerComponent implements OnInit {
    constructor(public haberApi: NewsService,public routerExtensions: RouterExtensions) {}
    haberdenGelenXml: any;
    jsonaDonusme: any;
    rssDonenDegerler: any;
    tamamlananDizi:any;
    ngOnInit() {
        this.haberServis();
        this.xmlVeriCekme(this.jsonaDonusme);
    }
    haberServis() {
        this.haberApi.fetchHaberService().subscribe((resp) => {
            this.haberdenGelenXml = resp;
            this.xmlVeriCekme(this.haberdenGelenXml);
        });
    }
    xmlVeriCekme(a) {
        this.jsonaDonusme = this.haberApi.xmldenAl(a);
        this.rssDonenDegerler=this.jsonaDonusme.rss.channel.forEach(x=>{

             this.tamamlananDizi=x.item

        })

        //console.log("rssDonenDegerler",this.rssDonenDegerler );
    }
    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
