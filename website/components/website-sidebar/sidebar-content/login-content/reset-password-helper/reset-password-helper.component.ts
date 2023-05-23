import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs';

import { WebsiteAuthService } from 'src/app/core/components/website/state/service/website-auth.service';
import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { UserInfoModel } from 'src/app/core/components/website/state/model/user-info.model';

@Component({
    selector: 'app-reset-password-helper',
    templateUrl: './reset-password-helper.component.html',
    styleUrls: ['./reset-password-helper.component.scss'],
})
export class ResetPasswordHelperComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    private userInfo: UserInfoModel = null;

    private verifyData: { emailHash: string; code: string } = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private websiteAuthService: WebsiteAuthService,
        private websiteActionsService: WebsiteActionsService
    ) {}

    ngOnInit(): void {
        this.checkIsValidInit();
    }

    private checkIsValidInit(): void {
        let isValid: boolean;

        this.route.queryParams.subscribe((params) => {
            if (!params[ConstantString.EMAIL_HASH]) {
                this.router.navigate([ConstantString.WEBSITE]);

                isValid = false;

                return;
            }

            this.verifyData = {
                emailHash: params[ConstantString.EMAIL_HASH]
                    .split(' ')
                    .join('+'),
                code: params[ConstantString.CODE].split(' ').join('+'),
            };

            this.userInfo = {
                firstName: params[ConstantString.FIRST_NAME],
                lastName: params[ConstantString.LAST_NAME],
                email: params[ConstantString.EMAIL],
            };

            isValid = true;
        });

        if (isValid) {
            this.websiteAuthService
                .getAccountAvatarImage(this.verifyData.code)
                .pipe(takeUntil(this.destroy$))
                .subscribe();

            setTimeout(() => {
                this.websiteAuthService
                    .verifyResetPassword(this.verifyData)
                    .pipe(
                        takeUntil(this.destroy$),
                        tap(() => {
                            this.websiteActionsService.setCreatePasswordSubject(
                                this.userInfo
                            );
                        })
                    )
                    .subscribe();
            }, 100);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
