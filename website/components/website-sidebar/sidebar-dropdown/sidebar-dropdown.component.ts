import { Component, Input, OnInit } from '@angular/core';

import { ConstantString } from '../../../state/enum/const-string.enum';

import { WebsiteActionsService } from '../../../state/service/website-actions.service';

@Component({
    selector: 'app-sidebar-dropdown',
    templateUrl: './sidebar-dropdown.component.html',
    styleUrls: ['./sidebar-dropdown.component.scss'],
})
export class SidebarDropdownComponent implements OnInit {
    @Input() displayResendConfirmationBtn: boolean = true;
    @Input() displayResetPasswordBtn: boolean = true;

    public openHavingTroubleContent: boolean = false;

    constructor(private websiteActionsService: WebsiteActionsService) {}

    ngOnInit(): void {}

    public onHavingTroubleClick(): void {
        this.openHavingTroubleContent = !this.openHavingTroubleContent;
    }

    public onGetBtnClickValue(
        event: { notDisabledClick: boolean },
        type?: string
    ): void {
        if (event.notDisabledClick) {
            if (type === ConstantString.RESET_PASSWORD_BTN) {
                this.websiteActionsService.setSidebarContentType(
                    ConstantString.RESET_PASSWORD
                );
            }

            if (type === ConstantString.RESEND_CONFIRMATION_BTN) {
                this.websiteActionsService.setSidebarContentType(
                    ConstantString.RESEND_CONFIRMATION
                );
            }
        }
    }
}
