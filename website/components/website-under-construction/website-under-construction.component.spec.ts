import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteUnderConstructionComponent } from './website-under-construction.component';

describe('WebsiteUnderConstructionComponent', () => {
  let component: WebsiteUnderConstructionComponent;
  let fixture: ComponentFixture<WebsiteUnderConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteUnderConstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteUnderConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
