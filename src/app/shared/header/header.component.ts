import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrafficService } from 'src/app/services/traffic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: any;
  guest: string;
  profileImage: any;

  constructor(private router: Router, private toasterSer: ToastrService, private imageSer: TrafficService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    if(this.userData) {
      this.profileImage = this.userData.profilePic;
    }
    if(sessionStorage.getItem('Guest')) {
      this.guest = sessionStorage.getItem('Guest');
    }
  }

  ngOnInit(): void {
    this.imageSer.profileImage.subscribe(res => {
      this.userData.profilePic = res;
      this.profileImage = this.userData.profilePic;
    })
  }

  loggedOut() {
    this.toasterSer.success('User logged out successfully');
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  routeToComp(value) {
    if(value === 'dashboard') {
      this.router.navigateByUrl('home/Dashboard');
    } else if (value === 'updateProile') {
      this.router.navigateByUrl('home/updateProfile');
    } else if (value === 'changePassword') {
      this.router.navigateByUrl('home/changePassword');
    }
  }

  routeIndividual(value) {
    if(value === 'postIssue') {
      this.router.navigateByUrl('home/createViolation');
    } else if (value === 'viewViolation') {
      this.router.navigateByUrl('home/violationlist');
    } else if (value === 'reward') {
      this.router.navigateByUrl('home/rewardPoints');
    } else if (value === 'notify') {
      this.router.navigateByUrl('home/notify');
    }
  }

  backToHome() {
    this.router.navigateByUrl('home/Dashboard');
  }

}
