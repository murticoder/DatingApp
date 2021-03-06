import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
     // tslint:disable-next-line:no-string-literal
     const selectedTab = params['tab'];
     this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
   });



    this.galleryOptions = [
      {
        width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imagePercent: 100,
                preview: false,
                imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = this.getImages();
  }


getImages() {
  const imageUrls = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.user.photos.length ; i++) {
    imageUrls.push({
      small: this.user.photos[i].url,
      medium: this.user.photos[i].url,
      big: this.user.photos[i].url,
      description: this.user.photos[i].description
    });
  }
  return imageUrls;
}

selectTab(tabId: number) {
  this.memberTabs.tabs[tabId].active = true;
}



  // loadUser() {
  //   // tslint:disable-next-line:no-string-literal
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
