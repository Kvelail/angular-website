import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { Offcanvas } from 'bootstrap';

import { Subject, takeUntil } from 'rxjs';

import { WebsiteActionsService } from '../../state/service/website-actions.service';

import { fadeInAnimation } from '../../state/utils/animation';

import { ConstantString } from '../../state/enum/const-string.enum';

@Component({
    selector: 'app-website-sidebar',
    templateUrl: './website-sidebar.component.html',
    styleUrls: ['./website-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInAnimation()],
})
export class WebsiteSidebarComponent implements OnInit, OnDestroy {
    @ViewChild('hideSidebarBtn') hideSidebarBtn: ElementRef<HTMLElement>;

    private destroy$ = new Subject<void>();

    public selectedContentType: string = null;
    public selectedContentWidth: number = null;

    constructor(
        private websiteActionsService: WebsiteActionsService,
        private renderer2: Renderer2
    ) {}

    ngOnInit(): void {
        this.getSidebarContentType();

        this.listenForSidebarHideEvent();

        this.showOrHideSidebar();
    }

    private getSidebarContentType(): void {
        this.websiteActionsService.getSidebarContentType$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.selectedContentType = res;

                    const WIDTH_ONE_ARR: string[] = [
                        ConstantString.START_TRIAL_CONFIRMATION,
                        ConstantString.START_TRIAL_WELCOME,
                        ConstantString.LOGIN,
                        ConstantString.RESET_PASSWORD_REQUESTED,
                        ConstantString.PASSWORD_UPDATED,
                        ConstantString.REGISTER_USER_CONFIRMATION,
                        ConstantString.REGISTER_USER_WELCOME,
                    ];

                    const WIDTH_TWO_ARR: string[] = [
                        ConstantString.RESET_PASSWORD,
                        ConstantString.CREATE_NEW_PASSWORD,
                        ConstantString.RESEND_CONFIRMATION,
                    ];

                    const WIDTH_THREE_ARR: string[] = [
                        ConstantString.START_TRIAL,
                        ConstantString.REGISTER_USER,
                    ];

                    if (WIDTH_ONE_ARR.includes(this.selectedContentType)) {
                        this.selectedContentWidth = 480;
                    }

                    if (WIDTH_TWO_ARR.includes(this.selectedContentType)) {
                        this.selectedContentWidth = 580;
                    }

                    if (WIDTH_THREE_ARR.includes(this.selectedContentType)) {
                        this.selectedContentWidth = 680;
                    }

                    if (this.selectedContentType) {
                        this.websiteActionsService.setSidebarContentWidth(
                            this.selectedContentWidth - 200
                        );
                    }
                }
            });
    }

    private listenForSidebarHideEvent(): void {
        this.renderer2.listen('document', 'hidden.bs.offcanvas', (_) => {
            this.selectedContentType = null;

            this.websiteActionsService.setSidebarContentType(
                this.selectedContentType
            );
        });
    }

    private showOrHideSidebar(): void {
        this.websiteActionsService.getOpenSidebarSubject$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    new Offcanvas(ConstantString.SIDEBAR).toggle();

                    this.websiteActionsService.setOpenSidebarSubject(false);
                } else {
                    if (this.hideSidebarBtn) {
                        const hideSidebarBtn: HTMLElement =
                            this.hideSidebarBtn.nativeElement;

                        hideSidebarBtn.click();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
