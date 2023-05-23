import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil, tap } from 'rxjs';

import { TaInputService } from 'src/app/core/components/shared/ta-input/ta-input.service';
import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';
import { WebsiteAuthService } from 'src/app/core/components/website/state/service/website-auth.service';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { ResendSignUpCompanyOrUserCommand } from 'appcoretruckassist';

@Component({
    selector: 'app-resend-confirmation',
    templateUrl: './resend-confirmation.component.html',
    styleUrls: ['./resend-confirmation.component.scss'],
})
export class ResendConfirmationComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    public resendConfirmationForm: FormGroup;

    public displaySpinner: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private inputService: TaInputService,
        private websiteAuthService: WebsiteAuthService,
        private websiteActionsService: WebsiteActionsService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.resendConfirmationForm = this.formBuilder.group({
            email: [null, [Validators.required]],
        });

        this.inputService.customInputValidator(
            this.resendConfirmationForm.get(ConstantString.EMAIL_ADDRESS),
            ConstantString.EMAIL_ADDRESS,
            this.destroy$
        );
    }

    public onKeyDown(event: any): void {
        if (event.keyCode === 13) {
            this.resendConfirmation();
        }
    }

    public onGetBtnClickValue(event: { notDisabledClick: boolean }): void {
        if (event.notDisabledClick) {
            this.resendConfirmation();
        }
    }

    private resendConfirmation(): void {
        if (this.resendConfirmationForm.invalid) {
            this.inputService.markInvalid(this.resendConfirmationForm);

            return;
        }

        this.displaySpinner = true;

        const saveData: ResendSignUpCompanyOrUserCommand = {
            email: this.resendConfirmationForm.get(ConstantString.EMAIL_ADDRESS)
                .value,
            isResendConfirmation: true,
        };

        this.websiteAuthService
            .resendRegisterCompanyOrUser(saveData)
            .pipe(
                takeUntil(this.destroy$),
                tap({
                    next: () => {
                        this.websiteActionsService.setSidebarContentType(
                            ConstantString.RESEND_CONFIRMATION_REQUESTED
                        );

                        localStorage.setItem(
                            ConstantString.CONFIRMATION_EMAIL,
                            JSON.stringify(
                                this.resendConfirmationForm.get(
                                    ConstantString.EMAIL_ADDRESS
                                ).value
                            )
                        );
                    },
                    error: (error: any) => {
                        this.displaySpinner = false;

                        const errorMessage = error.error.error;

                        this.resendConfirmationForm
                            .get(ConstantString.EMAIL_ADDRESS)
                            .setErrors(
                                errorMessage === ConstantString.USER_NOT_FOUND
                                    ? { userDoesntExist: true }
                                    : { userAlreadyRegistered: true }
                            );
                    },
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
