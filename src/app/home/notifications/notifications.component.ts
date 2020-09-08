import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notificationData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getNotifications().subscribe(res => {
      this.notificationData = res['data'];
    });
  }

  transform(violationDate) {
    return new Date(violationDate).toLocaleString();
  }

}
