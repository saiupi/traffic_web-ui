import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadViolationComponent } from './upload-violation.component';

describe('UploadViolationComponent', () => {
  let component: UploadViolationComponent;
  let fixture: ComponentFixture<UploadViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
