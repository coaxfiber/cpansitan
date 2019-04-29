import { Component } from '@angular/core';
import { IonicPage,  LoadingController, NavController, NavParams, App } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { GooglePlus } from '@ionic-native/google-plus';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: any;

  constructor(
    private storage: Storage,
    public global:GlobalvarsProvider,
    private googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    storage.get('email').then((val) => {
      if (val != null)
        {this.navCtrl.setRoot(TabsPage);}
    });
  }


  login() {
    // const loading = this.loadingCtrl.create({
    //   content:"Connecting to Google"
    // });
    // loading.present();

    this.googlePlus.login({})
      .then(res => {
        //loading.dismissAll();
        this.global.loginsave(res.email,res.displayName,res.imageUrl);
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(err => {
        //loading.dismissAll();
        this.global.loginsave('res.email','res.displayName','res.imageUrl');
        this.navCtrl.setRoot(TabsPage);
        alert("Google Server Error!");
        });
  }


  goToSignup() {
    // this.navCtrl.push(SignupPage);
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
 
}