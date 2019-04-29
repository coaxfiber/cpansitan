import {Component, ViewChild} from '@angular/core';
import {MultiImageUpload} from "../../components/multi-image-upload/multi-image-upload";
import {AlertController, ToastController,} from "ionic-angular";
import {Http } from '@angular/http';
import { Messages } from '../messages/messages';
import { Storage } from '@ionic/storage';
import {LoadingController, Loading } from 'ionic-angular';
import { NavController} from 'ionic-angular';

import {Headers,RequestOptions} from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html'

})



export class UploadImagePage {
@ViewChild(MultiImageUpload) multiImageUpload: MultiImageUpload;
    protected uploadFinished = false;
    email;descript='';
     loading: Loading;
     messages;

     id=0;
     address='';
     name='';

    constructor(public navCtrl: NavController,public global:GlobalvarsProvider,public http:Http,public storage: Storage,public loadingCtrl: LoadingController, 
   private alertCtrl: AlertController, private toastCtrl: ToastController) {
      this.global.uploadid = 0;
            this.storage.get('email').then((val) => {
                this.email = val;
            });
    }

    protected submit() {


        if (this.multiImageUpload.images.length == 0) {
            this.showToast("Please select at least 1 photo");
            return;
        }

                        this.loading = this.loadingCtrl.create({
                          });
                          this.loading.present();

                          let urlSearchParams = new URLSearchParams();
                            urlSearchParams.append("descript",this.descript);
                          let body = urlSearchParams.toString()
                          var header = new Headers();
                          header.append("Accept", "application/json");
                          header.append("Content-Type", "application/x-www-form-urlencoded");    
                          let option = new RequestOptions({ headers: header });
                           this.http.post(this.global.site + 'api.php?action=addpost&email='+this.email+'&pansitanid='+this.id,body,option)
                            .map(response => response.json())
                            .subscribe(res => {  

                                  this.loading.dismissAll();
                                  this.multiImageUpload.serverUrl = this.global.site + "upload.php?pansitanid="+res.pansitanid +'&type=2';
                                    this.multiImageUpload.uploadImages().then((images) => {
                                        this.uploadFinished = true;
                                        this.showToast("Posting successful.");
                                        console.dir(images);
                                    }).catch(() => {
                                    });

                            },error => {
                              console.log(error);
                              this.presentAlert("Connection Error!");
                              this.loading.dismissAll();
                             } );
        


    }
    
    protected cancel() {
        this.confirm('Are you sure to cancel?').then(value => {
            if (value) {
                this.multiImageUpload.abort();
            }
        })
    }

    private showToast(text: string) {
        this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'bottom'
        }).present();
    }

    private confirm(text: string) {
        return new Promise(
            (resolve) => {
                this.alertCtrl.create({
                    message: text,
                    buttons: [
                        {
                            text: "No",
                            role: 'cancel',
                            handler: () => {
                                resolve(false);
                            }
                        },
                        {
                            text: "Yes",
                            handler: () => {
                                resolve(true);
                            }
                        }
                    ]
                }).present();
            }
        );
    }
     presentAlert(val:any) {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: val,
              buttons: ['Dismiss']
            });
            alert.present();
          }

   openPropertyDetail() {
        this.navCtrl.push(Messages);
    }

  ionViewWillEnter(){
      this.id= this.global.uploadid;
      this.address= this.global.uploadaddress
      this.name= this.global.uploadname
    }
}