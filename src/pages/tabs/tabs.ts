import { Component } from '@angular/core';
import { Home } from '../home/home';
import { PropertyListPage } from '../property-list/property-list';
import { Profile } from '../profile/profile';
import { Dev } from '../dev/dev';
import { UploadImagePage } from '../upload-image/upload-image';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home;
  tab2Root = PropertyListPage;
  tab3Root = UploadImagePage;

  tab4Root = Profile;
  tab5Root = Dev;


  constructor() {
  	
  }

}
