import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil, tap } from 'rxjs';

import { TaInputService } from 'src/app/core/components/shared/ta-input/ta-input.service';
import { WebsiteAuthService } from '../../../../../state/service/website-auth.service';

import { passwordValidation } from 'src/app/core/components/shared/ta-input/ta-input.regex-validations';

import { ConstantString } from '../../../../../state/enum/const-string.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    public loginForm: FormGroup;

    public displaySpinner: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private inputService: TaInputService,
        private websiteAuthService: WebsiteAuthService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required, ...passwordValidation]],
            stayLoggedIn: [false],
        });

        this.inputService.customInputValidator(
            this.loginForm.get(ConstantString.EMAIL_ADDRESS),
            ConstantString.EMAIL_ADDRESS,
            this.destroy$
        );
    }

    public onKeyDown(event: { keyCode: number }): void {
        if (event.keyCode === 13) {
            this.userLogin();
        }
    }

    public onGetBtnClickValue(event: { notDisabledClick: boolean }): void {
        if (event.notDisabledClick) {
            this.userLogin();
        }
    }

    private userLogin() {
        if (this.loginForm.invalid) {
            this.inputService.markInvalid(this.loginForm);

            return false;
        }

        this.displaySpinner = true;

        this.websiteAuthService
            .accountLogin(this.loginForm.value)
            .pipe(
                takeUntil(this.destroy$),
                tap({
                    next: () => {
                        this.displaySpinner = false;
                    },
                    error: (error: any) => {
                        this.displaySpinner = false;

                        const errorMessage = error.error.error;

                        if (
                            errorMessage ===
                            ConstantString.THIS_USER_DOESENT_EXIST
                        ) {
                            this.loginForm
                                .get(ConstantString.EMAIL_ADDRESS)
                                .setErrors({ userDoesntExist: true });
                        }

                        if (
                            errorMessage ===
                            ConstantString.WRONG_PASSWORD_TRY_AGAIN
                        ) {
                            this.loginForm
                                .get(ConstantString.PASSWORD)
                                .setErrors({ wrongPassword: true });
                        }
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
