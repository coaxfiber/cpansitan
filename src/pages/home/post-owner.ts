import { Component } from '@angular/core';
import { ViewController,AlertController, ToastController } from 'ionic-angular';

import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Http } from '@angular/http';
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="alertremove()">Remove</button>
    </ion-list>
  `
})
export class PostOwner {
  constructor(public global:GlobalvarsProvider,public http:Http, private alertCtrl: AlertController,public viewCtrl: ViewController, public toastCtrl: ToastController) {}

  close() {
    this.viewCtrl.dismiss();
  }
  alertremove(){

    this.viewCtrl.dismiss();
    var text = "Remove this post?"
                this.alertCtrl.create({
                    message: text,
                    buttons: [
                        {
                            text: "No",
                            role: 'cancel',
                            handler: () => {
                            }
                        },
                        {
                            text: "Yes",
                            handler: () => {
                              this.http.get(this.global.site + 'api.php?action=deletepost&id='+this.global.postdelete)
                                .map(response => response.json())
                                .subscribe(res => {
                                    this.presentToast('Post has been Removed.')
                                },error => {
                                    this.presentToast('Failed to Delete post')
                                 } 
                                 );
                            }
                        }
                    ]
                }).present();
  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message:text,
      duration: 2000
    });
    toast.present();
  }
}