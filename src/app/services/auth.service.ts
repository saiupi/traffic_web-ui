import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpurlService } from './httpurl.service';
import { TrafficService } from './traffic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: any;

  headersNotoken = new HttpHeaders({
    'content-type': 'application/json'
  });

  formHeaders = new HttpHeaders({
    'content-type': 'application/x-www-form-urlencoded'
  });

  formOptions = {
    headers: this.formHeaders
  }

  options = {
    headers: this.headersNotoken
  }
  userData: any;
  userId: any;
  userIdData: any;
  
  constructor(private http: HttpClient, private urlService: HttpurlService, private userSer: TrafficService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.userSer.loginuserData.subscribe(res => {
      this.userIdData = res;
      this.userId = this.userIdData.userId;
    });
    if(this.userData) {
      this.userId = this.userData.userId;
    }
  }

  register(data) {
    return this.http.post(this.urlService.registration, JSON.stringify(data), this.options);
  }

  login(data) {
    return this.http.post(this.urlService.login, JSON.stringify(data), this.options);
  }

  mobileotpGenerate(data) {
    return this.http.post(this.urlService.mobileOTPgen, JSON.stringify(data), this.options);
  }

  verifyMobileOtp(data) {
    return this.http.post(this.urlService.verifyMobileOtp, JSON.stringify(data), this.options);
  }

  emailotpGenerate(data) {
    return this.http.post(this.urlService.emailOTPgen, JSON.stringify(data), this.options);
  }

  verifyEmailOtp(data) {
    return this.http.post(this.urlService.verifyEmailOtp, JSON.stringify(data), this.options);
  }

  forgotPwdMobileOtpGen(data) {
    return this.http.post(this.urlService.forgotPwdOTPgen, JSON.stringify(data), this.options);
  }

  forgotPwdMobileOtpVerify(data) {
    return this.http.post(this.urlService.forgotPwdOtpVerify, JSON.stringify(data), this.options);
  }

  resetPassword(data) {
    return this.http.post(this.urlService.resetPassword, JSON.stringify(data), this.options);
  }

  changePassword(data) {
    return this.http.patch(this.urlService.changePassword, JSON.stringify(data), this.options);
  }

  updateProfile(data) {
    return this.http.post(this.urlService.updateProfile, JSON.stringify(data), this.options);
  }

  imageUpload(data) {
    return this.http.post(this.urlService.imageUpload, data, {});
  }

  getViolationTypes() {
    return this.http.get(this.urlService.getViolationTypes);
  }

  postViolationType(data) {
    return this.http.post(this.urlService.postViolationType, data, this.options);
  }

  getUserViolations(data) {
    return this.http.post(this.urlService.getUserViolations, data, this.options);
  }

  getUserRewards() { 
    return this.http.get(this.urlService.getUserRewards + this.userId, this.formOptions);
  }

  getNotifications() {
    return this.http.get(this.urlService.getUserNotifications + this.userId);
  }
  
}
