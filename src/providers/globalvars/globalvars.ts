import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {
  site = 'http://eltonbagne.info/api/pansitan/';
  //site = 'http://localhost/pansit/';
  name;
  image;

  uploadname='';
  uploadaddress='';
  uploadid=0;

  postdelete
  constructor(private storage: Storage) {
    this.uploadid=0;
  }
  loginsave(email,name,image){
  	this.storage.set('email', email);
    this.storage.set('name', name);
    this.storage.set('image', image);
  }

  pass(name,address,pansitanid){
        this.uploadname = name;
        this.uploadaddress = address;
        this.uploadid = pansitanid;
  }
  logout(){

    this.storage.remove('email');
    this.storage.remove('name');
    this.storage.remove('image');
  }
}