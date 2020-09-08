import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TrafficService } from 'src/app/services/traffic.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm: FormGroup;
  mobileOtpForm: FormGroup;
  userData: any;
  usreImage:boolean = false;
  image: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private tosterSer: ToastrService,
              private imageSer: TrafficService, private router: Router) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.image = this.userData.profilePic;
  }

  ngOnInit(): void {
    let numOnly = /^[6789]\d{9}$/;
    const alphabets = /^[A-Za-z ]+$/;
    this.updateProfileForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern(alphabets)]],
      lname: ['', [Validators.required, Validators.pattern(alphabets)]],
      username: ['', [Validators.required, Validators.pattern(numOnly), Validators.minLength(10), Validators.maxLength(10)]]
    });

    this.updateProfileForm.patchValue({
      fname: this.userData.fname,
      lname: this.userData.lname,
      username: this.userData.username
    });

    this.mobileOtpForm = this.fb.group({
      Mpassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })

    if(this.userData.profilePic) {
      this.usreImage = true;
    }
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  get m() {
    return this.mobileOtpForm.controls;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.usreImage = true;
      }
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.authService.imageUpload(formData).subscribe(res => {
        if(res['status'] == 200) {
          this.userData.profilePic = res['fileName'];
          sessionStorage.setItem('userData', JSON.stringify(this.userData));
          this.image = res['fileName'];
          this.tosterSer.success(res['message']);
          this.imageSer.selectedImage(this.image);
        }
      }, err => {
          this.tosterSer.error(err.error.message);
      });
    }
  }

  update(value) {
    let prevData = JSON.parse(sessionStorage.getItem('userData'));
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    })
    sessionStorage.setItem('userData', JSON.stringify(prevData));
  }

  
  updateDetails() {
    if(this.updateProfileForm.invalid) {
      return;
    } else {
      if(this.userData.username != this.updateProfileForm.get('username').value) {
        let data: any = {};
        data['mobile'] = this.updateProfileForm.get('username').value;
        this.authService.mobileotpGenerate(data).subscribe(res => {
        if(res['status'] == 200) {
          this.tosterSer.success(res['message']);
          $('#mobileModal').modal({ backdrop: 'static', show: true, keyboard: true });
        }
      }, err => {
        this.tosterSer.error(err.error.message);
        $('#mobileModal').modal('hide');
      });
      } else {
        this.verifyAndUpdateProfile();
      }
    }
  }

  mobileDismiss() {
    $('#mobileModal').modal('hide');
  }

  verifyAndUpdateProfile() {
    const data = this.updateProfileForm.value;
    data['userId'] = this.userData.userId;
    data['profilePic'] = this.image;
    this.authService.updateProfile(data).subscribe(res => {
      if(res['status'] == 200) {
        this.update({ fname: this.updateProfileForm.controls['fname'].value,
                      lname: this.updateProfileForm.controls['lname'].value,
                      username: this.updateProfileForm.controls['username'].value});
        this.tosterSer.success(res['message']);
        this.router.navigateByUrl('home/Dashboard');
      }
    }, err => {
      this.tosterSer.error(err.error.message);
      $('#mobileModal').modal('hide');
    });
  }

  mobileOTPVerify() {
    if(this.mobileOtpForm.invalid) {
      return;
    } else {
      let data: any = {};
      data['mobile'] = this.updateProfileForm.get('username').value;
      data['password'] = this.mobileOtpForm.get('Mpassword').value;
      this.authService.verifyMobileOtp(data).subscribe(res => {
        if(res['status'] == 200) {
          this.verifyAndUpdateProfile();
          $('#mobileModal').modal('hide');
        }
      }, err => {
        this.tosterSer.error(err.error.message);
        $('#mobileModal').modal('hide');
      });
    }
  }

}
