import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ToastController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { ModalPost } from '../modal-post/modal-post';
import { EditProfile } from '../edit-profile/edit-profile';
import { Options } from '../options/options';
import { Storage } from '@ionic/storage';
import {Http } from '@angular/http';
import {LoadingController, Loading } from 'ionic-angular';
import {PropertyDetailPage} from '../property-detail/property-detail';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  limit=0;
  posts=null;
  loading: Loading;
  public profile_segment:string;

  acct = {"accountid":"0","email":" ","name":" ","descript":"","contact":"","gender":"","image":"0","status":"0"};
  email;name;image;properties=[{'name':"","address":''}]
  constructor(
    public alertCtrl: AlertController,public loadingCtrl: LoadingController, 
    public http:Http, public global:GlobalvarsProvider,
    private storage: Storage,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toastCtrl: ToastController) {  
      
            
            
  }
 

  ionViewWillEnter(){
    this.profile_segment = 'grid';
            this.storage.get('name').then((val) => {
              this.name = val;
              this.storage.get('email').then((val) => {
                this.email = val;
                this.storage.get('image').then((val) => {
                  this.image = val;
                        //start this
                        this.loading = this.loadingCtrl.create({
                          });
                          this.loading.present();

                          this.http.get(this.global.site + 'api.php?action=getaccount&email='+this.email+'&name='+this.name+'&image='+this.image)
                            .map(response => response.json())
                            .subscribe(res => {
                              this.properties = res.pansitanfav;
                              console.log(res)
                              this.acct = res;  
                                     this.http.get(this.global.site + 'api.php?action=userpostings&email='+this.email+'&limit='+this.limit)
                                        .map(response => response.json())
                                        .subscribe(res => {
                                          if (res[0].status=="failed") {
                                            // code...
                                          }else
                                          this.posts = res;
                                        });
                                          this.loading.dismissAll();
                            },error => {
                              console.log(error);
                              this.presentAlert("Connection Error!");
                              this.loading.dismissAll();
                             } );
                        //end this
                });
              });
            });}
    openPropertyDetail(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }

  // Define segment for everytime when profile page is active
 

  goEditProfile(user) {
    // Open it as a modal page
    
        this.navCtrl.push(EditProfile, user);
  }

  goOptions() {
    this.navCtrl.push(Options, {});
  }

  // Triggers when user pressed a post
  pressPhoto(post) {
    this.presentModal(post);
  }

  // Set post modal
  presentModal(post) {
    let modal = this.modalCtrl.create(ModalPost, 
      post, // This data comes from API!
    { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
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
