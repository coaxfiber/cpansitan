import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Loading } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import {Headers,RequestOptions} from '@angular/http';
import { Http } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile {

  // You can get this data from your API. This is a dumb data for being an example.
 
  user
  image
  loading: Loading;
  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public http:Http, public global:GlobalvarsProvider,
    ) {
    this.user = this.navParams.data;
          this.storage.get('image').then((val) => {
             this.image =  val;
          });
  }

  updateProfile() {
    this.loading = this.loadingCtrl.create({
      });

      this.loading.present();
                  let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("descript",this.user.descript);
                  let body = urlSearchParams.toString()
                  var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });

         this.http.post(this.global.site + 'api.php?action=updateaccount&image='+this.image+'&name='+this.user.name+'&contact='+this.user.contact+'&id='+this.user.accountid,body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.navCtrl.pop()
              this.loading.dismissAll();

          },error => {
            console.log(error)
            this.presentAlert("Connection Error!");
            this.loading.dismissAll();
           } );
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  presentAlert(val:any) {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: val,
              buttons: ['Dismiss']
            });
            alert.present();
          }
}
