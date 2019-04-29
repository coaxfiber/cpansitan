import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { IonicStorageModule } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { PostPopover } from '../pages/home/post-popover';
import { PostOwner } from '../pages/home/post-owner';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import { HttpModule } from '@angular/http';
import { PropertyService } from '../providers/property-service-mock/property-service-mock';
import { PansitanLocationPage } from '../pages/pansitan-location/pansitan-location';
import { StarRatingModule } from 'ionic3-star-rating';
import { PropertyListPage } from '../pages/property-list/property-list';
import { Profile } from '../pages/profile/profile';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { ModalPost } from '../pages/modal-post/modal-post';
import { Options } from '../pages/options/options';
import { Dev } from '../pages/dev/dev';
import { Messages } from '../pages/messages/messages';

import { UploadImagePage } from '../pages/upload-image/upload-image';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MultiImageUpload } from '../components/multi-image-upload/multi-image-upload'
import { MultiImageUploadModule } from '../components/components.module'

@NgModule({
  declarations: [
    MyApp,
    Home,
    TabsPage,
    PostPopover,
    PostOwner,
    PansitanLocationPage,
    PropertyDetailPage,
    UploadImagePage,
    PropertyListPage, //start here --remove for --prod
    // LoginPage,
    // Profile,
    // EditProfile,
    // ModalPost,
    // Options,
    // Dev,
    // Messages,
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    MultiImageUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    TabsPage, //start here
    LoginPage,
    PostPopover,
    PostOwner,
    PropertyDetailPage,
    PansitanLocationPage,
    PropertyListPage,
    EditProfile,
    Profile,
    ModalPost,
    Options,
    Dev,
    UploadImagePage,
    Messages,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PropertyService,
    GlobalvarsProvider,
    GooglePlus,
    Geolocation,
  ]
})
export class AppModule {}
