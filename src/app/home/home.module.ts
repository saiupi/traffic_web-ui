import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadViolationComponent } from './upload-violation/upload-violation.component';
import { ViolationslistComponent } from './violationslist/violationslist.component';
import { RewardpointsComponent } from './rewardpoints/rewardpoints.component';
import { ReadRewardpointsComponent } from './read-rewardpoints/read-rewardpoints.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    HomeComponent, 
    DashboardComponent, 
    UploadViolationComponent, 
    ViolationslistComponent, 
    RewardpointsComponent, 
    ReadRewardpointsComponent, 
    UpdateProfileComponent,
    HeaderComponent,
    ChangePasswordComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class HomeModule { }
