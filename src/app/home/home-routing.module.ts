import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadViolationComponent } from './upload-violation/upload-violation.component';
import { RewardpointsComponent } from './rewardpoints/rewardpoints.component';
import { ViolationslistComponent } from './violationslist/violationslist.component';
import { ReadRewardpointsComponent } from './read-rewardpoints/read-rewardpoints.component';
import { AuthGuard } from '../services/authGuard';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationsComponent } from './notifications/notifications.component';


const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'createViolation', component: UploadViolationComponent, canActivate: [AuthGuard] },
  { path: 'violationlist', component: ViolationslistComponent, canActivate: [AuthGuard] },
  { path: 'rewardPoints', component: RewardpointsComponent, canActivate: [AuthGuard] },
  { path: 'read-rewardpoints', component:ReadRewardpointsComponent, canActivate: [AuthGuard] },
  { path: 'updateProfile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'notify', component: NotificationsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
