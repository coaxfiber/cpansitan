import {Component} from '@angular/core';
import {ActionSheetController,  NavController, NavParams, ToastController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock/property-service-mock';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';
import {LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PansitanLocationPage } from '../pansitan-location/pansitan-location';
 
import { Storage } from '@ionic/storage';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

    email = ""

    ctrrate = false;
    fav:any;
    checkfav=0;
    checkrate=0;
    loading: Loading;
    property: any;
    image: any;
    rate: any;
    length=0;
    ratelength=0;
    sumLoan = 0;
    yourrate = 0;
    yourrateid=0;
    finalrate=0;
    constructor(
    private storage: Storage,public global:GlobalvarsProvider,private alertCtrl: AlertController,public loadingCtrl: LoadingController, public events: Events,public actionSheetCtrl: ActionSheetController,public http:Http, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController) {
      this.property = this.navParams.data;
      this.ctrrate = false;
      this.loading = this.loadingCtrl.create({
      });

      this.loading.present();
     
       storage.get('email').then((val) => {
         this.email = val;
         this.http.get(this.global.site + 'api.php?action=getimage&g=1&id='+this.property.pansitanid+'&email='+this.email)
          .map(response => response.json())
          .subscribe(res => {
            this.image = res.image;
            this.rate = res.rate;

            this.length = this.image.length;

            if (this.rate!=null) {
              this.ratelength = this.rate.length;
            }
            this.loading.dismissAll();

            for (var index = 0; index < this.ratelength; index++) {
                 var element = this.rate[index];
                 this.sumLoan = this.sumLoan + parseInt(element.rate);
                 if (element.email==this.email) {
                    this.checkrate=1;
                    this.yourrate = element.rate;
                    this.yourrateid = element.rateid;
                 }else this.checkrate=0
            }
            this.finalrate = this.sumLoan/this.ratelength;
            if (res.fav != null) {
              this.checkfav=1;
              this.fav = res.fav;
            }


          },error => {
            this.presentAlert("Something went wrong!");
            this.loading.dismissAll();
           } 
           );

         events.subscribe('star-rating:changed', (starRating) => {
           if (this.ctrrate == false) {
             this.ctrrate = true
             if (this.checkrate == 0)
             this.ratingadd(starRating);
             else
             this.rating(starRating); 
           }
         });

          });
        //this.showBanner();
    }
 seelocation(pass){
   this.navCtrl.push(PansitanLocationPage, pass);
 }

presentAlert(val:any) {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: val,
              buttons: ['Dismiss']
            });
            alert.present();
          }

favorites(){

      this.loading = this.loadingCtrl.create({
      });
      this.loading.present();
  if (this.checkfav == 1) {
    this.http.get(this.global.site + 'api.php?action=removefave&type=1&email=' +this.email+ '&id='+this.property.pansitanid)
          .map(response => response.json())
          .subscribe(res => {
            if (res.status == "success") {
              // code...
                   this.checkfav = 0;
                   this.presentToast("Removed from Favorites");
                    this.loading.dismissAll();
                }else
                {
                      this.presentToast("Oops! Something went wrong.");
                      this.loading.dismissAll();
                  }
             },error => {
                this.presentToast("Connection Failed.");
                this.loading.dismissAll();
           } 
           );

  }else{

    this.http.get(this.global.site + 'api.php?action=savefave&type=1&email=' +this.email+ '&id='+this.property.pansitanid)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
                    if (res.status == "success") {
              // code...
                   this.checkfav = 1;
                   this.presentToast("Added to Favorites");
                    this.loading.dismissAll();
                }else
                {
                      this.presentToast("Oops! Something went wrong.");
                    this.loading.dismissAll();
                  }
             },error => {
                    this.presentToast("Connection Failed.");
                    this.loading.dismissAll();
           } 
           );
  }
}
ratingadd(rate){
  this.ctrrate = true
   console.log('elts')

     this.checkrate = 1;
    this.http.get(this.global.site + 'api.php?action=ratingadd&rate='+rate+'&email=' +this.email+ '&id='+this.property.pansitanid)
          .map(response => response.json())
          .subscribe(res => {
            if (res.status == "success") {
                   this.presentToast("Rated");
                   this.yourrate = rate;
                   this.ratelength=this.ratelength+1;
                   this.sumLoan=this.sumLoan+rate;
                   this.finalrate = (this.sumLoan)/(this.ratelength);
              }else{
                  this.presentToast("Oops! Something went wrong.");
              }

                  this.checkrate = 1;this.ctrrate = false
             },error => {this.ctrrate = false
                  this.presentToast("Connection Failed.");
                   this.checkrate = 1;
           } 
           );
             
}

rating(rate){
  this.ctrrate = true
   console.log('elts')
    this.loading = this.loadingCtrl.create({
      });
      this.loading.present();

    this.http.get(this.global.site + 'api.php?action=ratingedit&rateid='+this.yourrateid+'&rate='+rate+'&email=' +this.email+ '&id='+this.property.pansitanid)
          .map(response => response.json())
          .subscribe(res => {
             this.loading.dismissAll();
            if (res.status == "success") {
                   this.presentToast("Rate Updated");
                   this.sumLoan = this.sumLoan - this.yourrate;
                   this.yourrate = rate;
                   this.sumLoan = this.sumLoan + this.yourrate;
                   this.finalrate = (this.sumLoan)/(this.ratelength);
              }else{
                    this.presentToast("Rate update Failed");
              }
              this.ctrrate = false;
             },error => {
                   this.loading.dismissAll();
                    this.presentToast("Connection Failed.");
                   this.ctrrate = false;
           } 
           );

             
}


    presentToast(x) {
    let toast = this.toastCtrl.create({
      message: x,
      duration: 2000
    });
    toast.present();
  }

}