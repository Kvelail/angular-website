import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordHelperComponent } from './reset-password-helper.component';

describe('ResetPasswordHelperComponent', () => {
  let component: ResetPasswordHelperComponent;
  let fixture: ComponentFixture<ResetPasswordHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
