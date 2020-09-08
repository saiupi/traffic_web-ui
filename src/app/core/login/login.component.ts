import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MustMatch } from '../registration/must-match-validator';
import { LocationStrategy } from '@angular/common';
import { TrafficService } from 'src/app/services/traffic.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  changePwdForm: FormGroup;
  forgotPwdOtpForm: FormGroup;
  guest: string = 'Guest';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toaster: ToastrService,
              private router: Router, private locationStrategy: LocationStrategy, private userSer: TrafficService) { }

  ngOnInit(): void {
    let numOnly = /^[6789]\d{9}$/;
    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(numOnly)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.changePwdForm = this.formBuilder.group({
      CPmobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(numOnly)]],
      CPpassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordRegEx)]],
      Cpassword: ['', Validators.required]
    }, {
      validator: MustMatch('CPpassword', 'Cpassword')
    });

    this.forgotPwdOtpForm = this.formBuilder.group({
      forgotOtp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.preventBackButton();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.router.navigateByUrl('auth');
    });
  }

  get f() {
    return this.loginForm.controls; 
  }

  get c() {
    return this.changePwdForm.controls;
  }

  get p() {
    return this.forgotPwdOtpForm.controls;
  }

  userLogin() {
    if(this.loginForm.invalid) {
      return false;
    } else {
      let data = this.loginForm.value;
      this.authService.login(data).subscribe(res => {
        if(res['status'] == 200) {
          this.toaster.success(res['message']);
          this.userSer.getUserData(res['data']);
          sessionStorage.setItem("userData", JSON.stringify(res['data']));
          this.router.navigateByUrl('/home/Dashboard');
        }
      }, err => {
        this.toaster.error(err.error.message);
      });
    }
  }

  guestLogin() {
    this.router.navigate(['home/Dashboard'], { queryParams: { flag: 'Guest' } });
    sessionStorage.setItem('Guest', this.guest);
  }

  changePassword() {
    if(this.changePwdForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['username'] = this.changePwdForm.get('CPmobile').value;
      this.authService.forgotPwdMobileOtpGen(data).subscribe(res => {
        if(res['status'] == 200) {
          this.toaster.success(res['message']);
          $('#myModalone').modal('hide');
          $('#forgotPwdOtp').modal({ backdrop: 'static', show: true, keyboard: true });
        }
      }, err => {
        this.toaster.error(err.error.message);
      });
    }
  }

  verifyMobileOtp() {
    if(this.forgotPwdOtpForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['username'] = this.changePwdForm.get('CPmobile').value;
      data['password'] = this.forgotPwdOtpForm.get('forgotOtp').value;
      this.authService.forgotPwdMobileOtpVerify(data).subscribe(res => {
        if(res['status'] == 200) {
          this.toaster.success(res['message']);
          let data: any = {};
          data['username'] = this.changePwdForm.get('CPmobile').value;
          data['password'] = this.changePwdForm.get('Cpassword').value;
          this.authService.resetPassword(data).subscribe(res => {
            if(res['status'] == 200) {
              this.toaster.success(res['message']);
              $('#forgotPwdOtp').modal('hide');
              this.router.navigateByUrl('auth');
            }
          }, err => {
            this.toaster.error(err.error.message);
          });
        }
      }, err => {
        this.toaster.error(err.error.message);
      });
    }
  }

  backToHome() {
    $('#forgotPwdOtp').modal('hide');
    $('#myModalone').modal('hide');
  }

}
