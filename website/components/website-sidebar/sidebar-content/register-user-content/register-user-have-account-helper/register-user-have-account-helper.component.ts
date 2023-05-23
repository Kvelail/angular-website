import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';

@Component({
    selector: 'app-register-user-have-account-helper',
    templateUrl: './register-user-have-account-helper.component.html',
    styleUrls: ['./register-user-have-account-helper.component.scss'],
})
export class RegisterUserHaveAccountHelperComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private websiteActionsService: WebsiteActionsService
    ) {}

    ngOnInit(): void {
        this.checkIsValidInit();
    }

    private checkIsValidInit(): void {
        let isValid: boolean;

        this.route.queryParams.subscribe((params) => {
            if (!params[ConstantString.EMAIL]) {
                this.router.navigate([ConstantString.WEBSITE]);

                isValid = false;

                return;
            }

            isValid = true;
        });

        if (isValid) {
            const userAlreadyLoggedIn = localStorage.getItem(
                ConstantString.USER
            );

            if (userAlreadyLoggedIn) {
                this.router.navigate([ConstantString.WEBSITE_SELECT_COMPANY]);
            } else {
                this.router.navigate([ConstantString.WEBSITE]);

                this.websiteActionsService.setOpenSidebarSubject(true);

                this.websiteActionsService.setSidebarContentType(
                    ConstantString.LOGIN
                );

                this.websiteActionsService.setIsEmailRouteSubject(true);
            }
        }
    }
}
