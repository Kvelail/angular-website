import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarConfirmBtnComponent } from './sidebar-confirm-btn.component';

describe('SidebarConfirmBtnComponent', () => {
    let component: SidebarConfirmBtnComponent;
    let fixture: ComponentFixture<SidebarConfirmBtnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarConfirmBtnComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarConfirmBtnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
