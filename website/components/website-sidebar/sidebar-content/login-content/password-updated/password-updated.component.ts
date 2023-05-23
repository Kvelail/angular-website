import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';
import { ImageBase64Service } from 'src/app/core/utils/base64.image';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { UserInfoModel } from './../../../../../state/model/user-info.model';

@Component({
    selector: 'app-password-updated',
    templateUrl: './password-updated.component.html',
    styleUrls: ['./password-updated.component.scss'],
})
export class PasswordUpdatedComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    public userInfo: UserInfoModel = null;
    public userAvatar: any = null;

    constructor(
        private websiteActionsService: WebsiteActionsService,
        private imageBase64Service: ImageBase64Service
    ) {}

    ngOnInit(): void {
        this.getUserInfo();
    }

    private getUserInfo(): void {
        this.websiteActionsService.getCreatePasswordSubject$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: UserInfoModel) => {
                this.userInfo = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                };
            });

        this.websiteActionsService.getAvatarImageSubject$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: string) => {
                if (res) {
                    this.userAvatar = this.imageBase64Service.sanitizer(res);
                }
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
