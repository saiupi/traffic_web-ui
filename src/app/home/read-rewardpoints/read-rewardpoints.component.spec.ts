import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRewardpointsComponent } from './read-rewardpoints.component';

describe('ReadRewardpointsComponent', () => {
  let component: ReadRewardpointsComponent;
  let fixture: ComponentFixture<ReadRewardpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadRewardpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRewardpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
