import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpurlService {

  constructor() { }

  registration = environment.trafficUrl+`${'api/user/register'}`;  // Registration
  login = environment.trafficUrl+`${'api/user/login'}`; // login url
  mobileOTPgen = environment.trafficUrl+`${'api/mobileOtp'}`; // OTP generation for mobile
  verifyMobileOtp = environment.trafficUrl+`${'api/verifyMobile'}`; // verification of mobile OTP
  emailOTPgen = environment.trafficUrl+`${'api/emailOtp'}`; // OTP generation for email
  verifyEmailOtp = environment.trafficUrl+`${'api/verifyEmail'}`; // verification of email OTP
  forgotPwdOTPgen = environment.trafficUrl+`${'api/user/forgotPassword'}`; // forgot password mobile OTP generation
  forgotPwdOtpVerify = environment.trafficUrl+`${'api/user/verifyMobile'}`; // forgot password user mobile OTP verification
  resetPassword = environment.trafficUrl+`${'api/user/resetPassword'}`; // reset the user password
  changePassword = environment.trafficUrl+`${'api/user/changePassword'}`; // after login change password
  updateProfile = environment.trafficUrl+`${'api/user/updateProfile'}`; // update profile details
  imageUpload = environment.trafficUrl+`${'api/upload'}`; // image upload
  getViolationTypes = environment.trafficUrl+`${'api/violationType/getViolationTypes'}`; // get all violation types
  postViolationType = environment.trafficUrl+`${'api/violation/postViolation'}`; // post violation type
  getUserViolations = environment.trafficUrl+`${'api/violation/getUserViolation'}`; // get user violations
  getUserRewards = environment.trafficUrl+`${'api/userRewards/getUserTotalRewards?userId='}`; // get user rewards
  getUserNotifications = environment.trafficUrl+`${'api/notification/getNotification?userId='}`; // get notifications
}
