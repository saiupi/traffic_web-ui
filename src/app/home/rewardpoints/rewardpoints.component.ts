import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewardpoints',
  templateUrl: './rewardpoints.component.html',
  styleUrls: ['./rewardpoints.component.css']
})
export class RewardpointsComponent implements OnInit {
  userRewards: any;
  totalRewards: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserRewards();
  }

  getUserRewards() {
    this.authService.getUserRewards().subscribe(res => {
      this.userRewards = res['data'];
      this.totalRewards = res['totalRewards'];
    });
  }

  transform(violationDate) {
    return new Date(violationDate).toLocaleString();
  }

  redeemPage() {
    this.router.navigate(['home/read-rewardpoints'], { queryParams: { rewards: this.totalRewards } });
  }

}
