import { Component, ViewChild } from '@angular/core';
import { App, NavController, Content, PopoverController, ToastController } from 'ionic-angular';
import { PostPopover } from './post-popover';
import { PostOwner } from './post-owner';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PropertyDetailPage} from '../property-detail/property-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  @ViewChild(Content) content: Content;

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  public tap: number = 0;

  // You can get this data from your API. This is a dumb data for being an example.


  loading: Loading;
  limit = 0;
  posts:any;
  addlike:any;
  email;
  image

  //type of pansitan =2   sa image yan
  //type of post =1
   
  loadp=0;
  loadpost=0;
  top;
  constructor( 
    public storage: Storage,
    public toastCtrl: ToastController,private alertCtrl: AlertController,public loadingCtrl: LoadingController,public http:Http, public global:GlobalvarsProvider,public navCtrl: NavController, public popoverCtrl: PopoverController, public app: App) {
   //http://localhost/pansit/api.php?action=get_app_list


         this.http.get(this.global.site + 'api.php?action=top')
          .map(response => response.json())
          .subscribe(res => {
            this.top =res;
            console.log(res)
            this.loadp = 1;
          },error => {
            console.log(error)
            this.loadp = 2;
           } 
           );


         
          this.storage.get('email').then((val) => {
            this.email = val;
          });
          this.storage.get('image').then((val) => {
            this.image = val;
          });

          
         this.http.get(this.global.site + 'api.php?action=postings&limit='+this.limit)
          .map(response => response.json())
          .subscribe(res => {
            this.posts = res;
            this.loadpost =1;

          },error => {
            this.loadpost =2;
           } 
           );



  }

  seemore(){
    this.loading = this.loadingCtrl.create({
      });

      this.loading.present();
    this.limit=this.limit+10;
    this.http.get(this.global.site + 'api.php?action=postings&limit='+this.limit)
          .map(response => response.json())
          .subscribe(res => {
            if (res[0].status != 'failed') {
             this.posts = this.posts.concat(res);
            }else
              this.presentAlert("No more Posts to show...");
              this.loading.dismissAll();

          },error => {
            console.log(error)
            this.presentAlert("Connection Error!");
            this.loading.dismissAll();
           } 
           );
  }
  postheart(x,like){
    if (like!=null) {
        for (var index = 0; index < like.length; index++) {
                     var element = like[index];
                     if (element.email==this.email) {
                        this.posts[x].heart = 'heart';
                     }
                }
      }
      return this.posts[x].heart
  }

  likeButton(post,x) {

    if (post.heart === 'heart-outline') {
                      this.posts[x].heart = 'heart';
                      this.posts[x].color = 'danger';
                      
                      this.addlike = [{ likeid:"0",postid:post.postid, email:this.email }];
                      if ( this.posts[x].like != null) {
                        this.posts[x].like = this.posts[x].like.concat(this.addlike);
                      }else
                        this.posts[x].like =this.addlike;

        this.http.get(this.global.site + 'api.php?action=like&email=' +this.email+ '&id='+post.postid)
              .map(response => response.json())
              .subscribe(res => {
                    if (res.status == "success") {
                       
                    }else
                    {  
                      this.posts[x].heart = 'heart-outline';
                      this.posts[x].color = 'black';
                        this.presentToast("Oops! Something went wrong.");
                      }
                 },error => {
                      this.posts[x].heart = 'heart-outline';
                      this.posts[x].color = 'black';
                        this.presentToast("Connection Error!");
                        this.loading.dismissAll();
               } 
               );
    }
  }

  tapPhotoLike(post,x) { // If we click double times, it will trigger like the post
    this.tap++;
    if(this.tap % 2 === 0) {
      this.likeButton(post,x);
    }
    setTimeout(()=>{  this.tap = 0 }, 1000)
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

  swipePage(event) {
    if(event.direction === 8) { // Swipe Left
      console.log("Swap Camera");
    } 

    if(event.direction === 2) { // Swipe Right
      //this.goMessages();
    }
    
  }

  gotopansitan(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }

  reset(){
    this.loadp = 0;
    this.loadpost = 0;
    this.http.get(this.global.site + 'api.php?action=top')
          .map(response => response.json())
          .subscribe(res => {
            this.top =res;
            this.loadp = 1;
          },error => {
            this.loadp = 2;
           } 
           );

    this.content.scrollToTop();
    this.limit = 0;

         this.http.get(this.global.site + 'api.php?action=postings&limit='+this.limit)
          .map(response => response.json())
          .subscribe(res => {
            this.posts = res;
            this.loadpost = 1;

          },error => {
            this.loadpost = 2;
           } 
           );

    this.content.scrollToTop();
  }
  scrollToTop() {
    this.content.scrollToTop();
  }

  presentAlert(val:any) {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: val,
              buttons: ['Dismiss']
            });
            alert.present();
          }

          process(time){
            var date1 = new Date(time*1000);
            var date2 = new Date();

            var diff = Math.abs(date2.getTime() - date1.getTime());

            var diffmin = Math.ceil((diff / 1000)/60); 

            if (diffmin < 1440) {
              if (diffmin < 60 ) {
                return diffmin + "m ago"
              }else{
                return Math.floor( diffmin/60 ) + "h and " + (diffmin%60) + "m ago"
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
  openPropertyDetail(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }
}
