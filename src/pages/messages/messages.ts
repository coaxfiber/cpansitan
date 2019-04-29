import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock/property-service-mock';

import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import {Http } from '@angular/http';
import {LoadingController, Loading } from 'ionic-angular';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class Messages {

      loading: Loading;

    properties: Array<any>;
    searchKey: string = "";
  // You can get this data from your API. This is a dumb data for being an example.
 

  constructor(
          public service: PropertyService,
         public global:GlobalvarsProvider,public navCtrl: NavController,public http:Http,public loadingCtrl: LoadingController, public navParams: NavParams, private app: App) {
  
    this.loading = this.loadingCtrl.create({
    });

    this.loading.present();

     this.http.get( this.global.site + 'api.php?action=get_app_list')
          .map(response => response.json())
          .subscribe(res => {
              this.properties = res;
                         this.loading.dismissAll();
          }, error => {
                         this.loading.dismissAll();
                         });
          this.findAll();
  }
 findAll() {

        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }

     onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
            })
            .catch(error => alert(JSON.stringify(error)));
            
    }
    

    onCancel(event) {
        this.findAll();
    }

  close(name,address,pansitanid){
        this.global.pass(name,address,pansitanid)
        this.navCtrl.pop();
  }

}
