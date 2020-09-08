import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationslistComponent } from './violationslist.component';

describe('ViolationslistComponent', () => {
  let component: ViolationslistComponent;
  let fixture: ComponentFixture<ViolationslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
