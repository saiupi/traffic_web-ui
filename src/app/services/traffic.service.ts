import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  profileImage = new Subject();
  loginuserData = new Subject();

  constructor() { }

  selectedImage(image) {
    this.profileImage.next(image);
  }

  getUserData(data) {
    this.loginuserData.next(data);
  }

}
