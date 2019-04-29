import { Component } from '@angular/core';
import { ModalController, ViewController, PopoverController, NavParams } from 'ionic-angular';

import { PostOwner } from './../home/post-owner';
import { PostPopover } from './../home/post-popover';
import { ToastController } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/storage';
import {Http } from '@angular/http';
@Component({
  selector: 'page-modalpost',
  templateUrl: 'modal-post.html',
})
export class ModalPost {

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };
  addlike
  modal_data;
  email
  constructor(
    public storage: Storage,public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,public http:Http,public viewCtrl: ViewController,public global:GlobalvarsProvider, public navParams: NavParams, public modalCtrl: ModalController) {
    this.modal_data = this.navParams.data;
    console.log(this.navParams.data)
     storage.get('email').then((val) => {
            this.email = val;
          });
  }

  ionViewDidLoad() {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postheart(like){
    if (like!=null) {
        for (var index = 0; index < like.length; index++) {
                     var element = like[index];
                     if (element.email==this.email) {
                        return 'heart'
                     }
                }
      }
                        return 'heart-outline'
  }

  likeButton() {
    if (this.modal_data.heart === 'heart-outline') {
      this.modal_data.heart = 'heart';

                     this.addlike = [{ likeid:"0",postid:this.modal_data.postid, email:this.email }];
                      if ( this.modal_data.like != null) {
                        this.modal_data.like = this.modal_data.like.concat(this.addlike);
                      }else
                        this.modal_data.like =this.addlike;

        this.http.get(this.global.site + 'api.php?action=like&email=' +this.email+ '&id='+this.modal_data.postid)
              .map(response => response.json())
              .subscribe(res => {
                    if (res.status == "success") {
                       
                    }else
                    {  
                        this.modal_data.heart = 'heart-outline';
                        this.presentToast("Oops! Something went wrong.");
                      }
                 },error => {
                        this.modal_data.heart = 'heart-outline';
                        this.presentToast("Connection Error.");
               } 
               );
    }


  }

  goUserProfile(userId: number) {
    console.log("User id: " + userId);
  }

  process(time){
            var date1 = new Date(time*1000);
            var date2 = new Date();

            var diff = Math.abs(date2.getTime() - date1.getTime());

            var diffmin = Math.ceil((diff / 1000)/60); 

            if (diffmin < 1440) {
              if (diffmin < 60 ) {
                return diffmin + " minutes ago"
              }else{
                return Math.floor( diffmin/60 ) + " hours and " + (diffmin%60) + " minutes"
              }
            }else
            {
              return date1.toDateString()
            }
          }
  
    presentToast(x) {
    let toast = this.toastCtrl.create({
      message: x,
      duration: 2000
    });
    toast.present();
  }

  presentPostPopover() {
    let popover = this.popoverCtrl.create(PostPopover);
    popover.present();
  }
  presentPostOwner(x) {
    this.global.postdelete = x;
    let popover = this.popoverCtrl.create(PostOwner);
    popover.present();
  }
  
}