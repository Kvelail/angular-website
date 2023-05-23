import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserHelperComponent } from './register-user-helper.component';

describe('RegisterUserHelperComponent', () => {
  let component: RegisterUserHelperComponent;
  let fixture: ComponentFixture<RegisterUserHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
