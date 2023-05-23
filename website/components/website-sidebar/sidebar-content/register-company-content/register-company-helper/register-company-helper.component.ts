import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs';

import { WebsiteAuthService } from 'src/app/core/components/website/state/service/website-auth.service';
import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { UserInfoModel } from 'src/app/core/components/website/state/model/user-info.model';

@Component({
    selector: 'app-register-company-helper',
    templateUrl: './register-company-helper.component.html',
    styleUrls: ['./register-company-helper.component.scss'],
})
export class RegisterCompanyHelperComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    private verifyUserInfo: UserInfoModel = null;

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

            this.verifyUserInfo = {
                firstName: params[ConstantString.FIRST_NAME],
                lastName: params[ConstantString.LAST_NAME],
                email: params[ConstantString.EMAIL],
                companyName: params[ConstantString.COMPANY_NAME],
            };

            isValid = true;
        });

        if (isValid) {
            this.websiteAuthService
                .registerCompanyVerifyOwner(this.verifyData)
                .pipe(
                    takeUntil(this.destroy$),
                    tap(() => {
                        this.websiteActionsService.setVerifyUserInfoSubject(
                            this.verifyUserInfo
                        );
                    })
                )
                .subscribe();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
