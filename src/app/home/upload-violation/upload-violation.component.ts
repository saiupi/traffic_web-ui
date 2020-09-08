import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-upload-violation',
  templateUrl: './upload-violation.component.html',
  styleUrls: ['./upload-violation.component.css']
})
export class UploadViolationComponent implements OnInit {

  slideIndex = 1;
  violationData: any;
  violationTypeId: any;
  violationType: any;
  userData: any;
  userId: number;
  usreImage: boolean = false;
  image: any;
  maxDate = new Date();
  dateLocationForm: FormGroup
  timeStamp: number;
  isDisabled: boolean = true;

  constructor(private authService: AuthService, private tosterSer: ToastrService, private fb: FormBuilder,
              private router: Router) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    if(this.userData) {
      this.userId = this.userData.userId;
    }
  }

  ngOnInit(): void {
    this.getAllViolations();
    this.dateLocationForm = this.fb.group({
      violationDate: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  getAllViolations() {
    this.authService.getViolationTypes().subscribe(res => {
      this.violationData = res['data'];
    });
  }

  getViolationData(value) {
    if(value) {
      this.isDisabled = false;
    }
    this.violationTypeId = value.violationTypeId;
    this.violationType = value.name;
  }

  get f() {
    return this.dateLocationForm.controls;
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
          this.image = res['fileName'];
        }
      }, err => {
          this.tosterSer.error(err.error.message);
      });
    }
  }

  postViolation() {
      const data: any = {};
      let time = new Date(this.dateLocationForm.get('violationDate').value);
      this.timeStamp = time.getTime();
        data['image'] = this.image;
        data['violationDate'] = this.timeStamp;
        data['location'] = this.dateLocationForm.get('location').value;
        data['violationTypeId'] = this.violationTypeId;
        data['violationType'] = this.violationType;
        data['userId'] = this.userId;
        data['deviceId'] = '';
        data['adminId'] = '';
        data['lat'] = '';
        data['lng'] = '';
        data['device_type'] = 'Web';
        this.authService.postViolationType(data).subscribe(res => {
          if(res['status'] == 200) {
            this.tosterSer.success(res['message']);
            if(sessionStorage.getItem('userData')) {
              $('#successPopup').modal({ backdrop: 'static', show: true, keyboard: true });
              //this.router.navigateByUrl('home/violationlist');
            } else {
              this.tosterSer.success('Thank you for sharing the violation with us');
            }
          }
        }, err => {
          this.tosterSer.error(err.error.message);
        });
  }

  goToViolations() {
    $('#successPopup').modal('hide');
    this.router.navigateByUrl('home/violationlist');
  }

}
