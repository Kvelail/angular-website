import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSidebarComponent } from './website-sidebar.component';

describe('WebsiteSidebarComponent', () => {
  let component: WebsiteSidebarComponent;
  let fixture: ComponentFixture<WebsiteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
