import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserHelperComponent } from './verify-user-helper.component';

describe('VerifyUserHelperComponent', () => {
  let component: VerifyUserHelperComponent;
  let fixture: ComponentFixture<VerifyUserHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUserHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyUserHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
