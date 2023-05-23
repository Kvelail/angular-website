import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { UserInfoModel } from '../../../../state/model/user-info.model';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
    @Input() registerUserWelcome: boolean = false;

    private destroy$ = new Subject<void>();

    public userInfo: UserInfoModel = null;

    constructor(private websiteActionsService: WebsiteActionsService) {}

    ngOnInit(): void {
        this.getWelcomeInfo();
    }

    private getWelcomeInfo(): void {
        this.websiteActionsService.getVerifyUserInfoSubject$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: UserInfoModel) => {
                this.userInfo = {
                    ...(!this.registerUserWelcome && {
                        companyName: res.companyName,
                    }),
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                };
            });
    }

    public onGetBtnClickValue(event: { notDisabledClick: boolean }): void {
        if (event.notDisabledClick) {
            this.websiteActionsService.setSidebarContentType(
                ConstantString.LOGIN
            );
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
