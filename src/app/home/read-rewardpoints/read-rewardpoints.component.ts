import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-rewardpoints',
  templateUrl: './read-rewardpoints.component.html',
  styleUrls: ['./read-rewardpoints.component.css']
})
export class ReadRewardpointsComponent implements OnInit {
  rewards: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.rewards = params.rewards;
    });
  }

  backToRewards() {
    this.router.navigateByUrl('home/rewardPoints');
  }

}
