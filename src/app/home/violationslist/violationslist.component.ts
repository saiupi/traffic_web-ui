import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-violationslist',
  templateUrl: './violationslist.component.html',
  styleUrls: ['./violationslist.component.css']
})
export class ViolationslistComponent implements OnInit {
  userData: any;
  userId: any;
  violationData: any;
  filterData: any = [];

  constructor(private authService: AuthService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    if(this.userData) {
      this.userId = this.userData.userId;
    }
  }

  ngOnInit(): void {
    this.getUserViolations();
  }

  transform(violationDate) {
    return new Date(violationDate).toLocaleString();
  }

  getUserViolations() {
    let data: any = {};
    data['userId'] = this.userId;
    data['status'] = 0;
    this.authService.getUserViolations(data).subscribe(res => {
      this.violationData = res['data'];
      this.filterData = res['data'];
    });
  }

  filterViolations(value) {
    this.filterData = this.violationData.filter(data => data.status == value);
  }

  filterAllViolations() {
    this.getUserViolations();
  }

}
