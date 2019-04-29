import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/**
 * Generated class for the Options page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class Options {

  constructor(
    public global:GlobalvarsProvider,
    private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Options');
  }

  logout(){
    this.global.logout();
    this.reloadapp();
  }

    reloadapp(){
      this.storage.get('email').then((val) => {
      if (val == null)
        {location.reload();}
    });
    }
}
