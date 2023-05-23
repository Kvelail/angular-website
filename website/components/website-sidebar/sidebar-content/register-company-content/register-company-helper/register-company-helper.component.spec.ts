import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyHelperComponent } from './register-company-helper.component';

describe('RegisterCompanyHelperComponent', () => {
  let component: RegisterCompanyHelperComponent;
  let fixture: ComponentFixture<RegisterCompanyHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
