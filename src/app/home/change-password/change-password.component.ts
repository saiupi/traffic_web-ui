import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/core/registration/must-match-validator';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  userData: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private toasterSer: ToastrService,
              private router: Router) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordRegEx)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordRegEx)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmNewPassword')
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    if(this.changePasswordForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['username'] = this.userData.username;
      data['oldPassword'] = this.changePasswordForm.get('oldPassword').value;
      data['newPassword'] = this.changePasswordForm.get('confirmNewPassword').value;
      this.authService.changePassword(data).subscribe(res => {
        if(res['status'] == 200) {
          this.toasterSer.success(res['message']);
          this.router.navigateByUrl('home/Dashboard');
        }
      }, err => {
        this.toasterSer.error(err.error.message);
      });
    }
  }

  backToHome() {
    this.router.navigateByUrl('home/Dashboard');
  }

}
