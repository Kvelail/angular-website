import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteMainComponent } from './website-main.component';

describe('WebsiteMainComponent', () => {
  let component: WebsiteMainComponent;
  let fixture: ComponentFixture<WebsiteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
