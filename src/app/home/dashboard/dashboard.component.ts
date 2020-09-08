import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;
  guest: any;
  isDisabled: boolean = false;

  constructor(private router: Router, private toasterSer: ToastrService, private activatedRoute: ActivatedRoute,
              private locationStrategy: LocationStrategy) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.guest = params.flag;
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('Guest')) {
      this.guest = sessionStorage.getItem('Guest');
    }
    this.preventBackButton();
  }

  loggedOut() {
    this.toasterSer.success('User logged out successfully');
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.router.navigateByUrl('home/Dashboard');
    });
  }

  updateProile() {
    this.router.navigateByUrl('home/updateProfile');
  }

}
