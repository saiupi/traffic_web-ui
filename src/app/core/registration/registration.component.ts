import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MustMatch } from './must-match-validator';

declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  mobileOtpForm: FormGroup;
  emailOtpForm: FormGroup;
  submitted: boolean = false;
  emailError: string;
  showModal : boolean;
  mobileNumber: any;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toasterSer: ToastrService,
              private router: Router) {
  }

  // showHide() {
  //   $(".toggle-password").click(function() {
  //     $(this).toggleClass("fa-eye fa-eye-slash");
  //     var input = $($(this).attr("toggle"));
  //     if (input.attr("type") == "password") {
  //       input.attr("type", "text");
  //     } else {
  //       input.attr("type", "password");
  //     }
  //   });
  // }

  ngOnInit(): void {
    //let emailORphone = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/;
    const alphabets = /^[A-Za-z ]+$/;
    let numOnly = /^[6789]\d{9}$/;
    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    this.registrationForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern(alphabets)]],
      lname: ['', [Validators.required, Validators.pattern(alphabets)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(numOnly)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordRegEx)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.mobileOtpForm = this.formBuilder.group({
      Mpassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.emailOtpForm = this.formBuilder.group({
      Epassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  get f() { 
    return this.registrationForm.controls; 
  }

  get m() {
    return this.mobileOtpForm.controls;
  }

  get e() {
    return this.emailOtpForm.controls;
  }

  valuechange(value) {
    if(value) {
      return false;
    }
  }

  checkEmail(email) {
    if(email.target.value.indexOf('@') != -1) {
      let checkNumber = (email.target.value).split('@')[0];
      if(!isNaN(checkNumber)) {
        this.emailError = 'Email must be a valid email address';
        return;
      }
    }
  }

  registration() {
    this.submitted = true;
    if(this.registrationForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['mobile'] = this.registrationForm.get('username').value;
      this.authService.mobileotpGenerate(data).subscribe(res => {
        if(res['status'] == 200) {
          this.toasterSer.success(res['message']);
          $('#mobileModal').modal({ backdrop: 'static', show: true, keyboard: true });
        }
      }, err => {
        this.toasterSer.error(err.error.message);
        $('#mobileModal').modal('hide');
      });
    }
  }

  backToLogin() {
    this.router.navigateByUrl('auth');
  }

  mobileOTPVerify() {
    if(this.mobileOtpForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['mobile'] = this.registrationForm.get('username').value;
      data['password'] = this.mobileOtpForm.get('Mpassword').value;
      this.authService.verifyMobileOtp(data).subscribe(res => {
        if(res['status'] == 200) {
          this.mobileOtpForm.reset();
          const Edata: any = {};
          Edata['email'] = this.registrationForm.get('email').value;
          $('#mobileModal').modal("hide");
            this.authService.emailotpGenerate(Edata).subscribe(res => {
              if(res['status'] == 200) {
                this.toasterSer.success(res['message']);
                $('#emailModal').modal({ backdrop: 'static', show: true, keyboard: true });
              }
            }, err => {
              this.toasterSer.error(err.error.message);
            });
          this.toasterSer.success(res['message']);
        }
      }, err => {
        this.toasterSer.error(err.error.message);
      });
    }
  }

  emailOTPVerify() {
    if(this.emailOtpForm.invalid) {
      return;
    } else {
      const data: any = {};
      data['email'] = this.registrationForm.get('email').value;
      data['password'] = this.emailOtpForm.get('Epassword').value;
        this.authService.verifyEmailOtp(data).subscribe(res => {
          if(res['status'] == 200) {
            this.emailOtpForm.reset();
            this.toasterSer.success(res['message']);
            const deviceType = 'Web';
            const dateOfBirth = this.registrationForm.get('dob').value.toLocaleDateString();
            let data = this.registrationForm.value;
            delete data['confirmPassword'];
            data['device_type'] = deviceType;
            data['device_token'] = '';
            data['dob'] = dateOfBirth;
            this.authService.register(data).subscribe(res => {
              if(res['status'] == 200) {
                $('#emailModal').modal('hide');
                this.toasterSer.success(res['message']);
                this.router.navigateByUrl('auth');
              }
            }, err => {
              this.toasterSer.error(err.error.message);
            });
          }
        }, err => {
          this.toasterSer.error(err.error.message);
        });
    }
  }

  emailDismiss() {
    this.registrationForm.reset();
    $('#emailModal').modal('hide');
  }

  mobileDismiss() {
    this.registrationForm.reset();
    $('#mobileModal').modal('hide');
  }

}
