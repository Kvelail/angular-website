/* eslint-disable no-unused-vars */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil, tap } from 'rxjs';

import { TaInputService } from 'src/app/core/components/shared/ta-input/ta-input.service';
import { WebsiteActionsService } from 'src/app/core/components/website/state/service/website-actions.service';
import { WebsiteAuthService } from 'src/app/core/components/website/state/service/website-auth.service';

import {
    addressUnitValidation,
    addressValidation,
    firstNameValidation,
    lastNameValidation,
    passwordValidation,
    phoneFaxRegex,
} from 'src/app/core/components/shared/ta-input/ta-input.regex-validations';

import { ConstantString } from 'src/app/core/components/website/state/enum/const-string.enum';
import { AddressEntity, SignupUserCommand } from 'appcoretruckassist';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
    @ViewChild('inputAddress', { static: false }) public inputAddress: any;

    private destroy$ = new Subject<void>();

    public registerUserForm: FormGroup;

    private registerUserCode: string = null;

    public selectedAddress: AddressEntity = null;

    public userInfo: {
        companyName: string;
        department: string;
    } = null;

    public displaySpinner: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private inputService: TaInputService,
        private websiteActionsService: WebsiteActionsService,
        private websiteAuthService: WebsiteAuthService
    ) {}

    ngOnInit(): void {
        this.createForm();

        this.patchForm();

        this.passwordsNotSame();
    }

    private createForm(): void {
        this.registerUserForm = this.formBuilder.group({
            firstName: [null, [Validators.required, ...firstNameValidation]],
            lastName: [null, [Validators.required, ...lastNameValidation]],
            address: [null, [...addressValidation]],
            addressUnit: [null, [...addressUnitValidation]],
            phone: [null, [phoneFaxRegex]],
            email: [null, [Validators.required]],
            password: [null, [Validators.required, ...passwordValidation]],
            confirmPassword: [
                null,
                [Validators.required, ...passwordValidation],
            ],
        });

        this.inputService.customInputValidator(
            this.registerUserForm.get(ConstantString.EMAIL_ADDRESS),
            ConstantString.EMAIL_ADDRESS,
            this.destroy$
        );
    }

    private patchForm(): void {
        this.websiteActionsService.getRegisterUserInfoSubject$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                this.registerUserForm.patchValue({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                });

                this.userInfo = {
                    companyName: res.companyName,
                    department: res.department,
                };

                this.registerUserCode = res.code;
            });
    }

    public handleAddressChange(event: {
        address: any;
        longLat: any;
        valid: boolean;
    }): void {
        this.selectedAddress = event.address;

        if (!event.valid) {
            this.registerUserForm
                .get(ConstantString.ADDRESS)
                .setErrors({ invalid: true });
        }
    }

    private passwordsNotSame(): void {
        const passwordControl = this.registerUserForm.get(
            ConstantString.PASSWORD
        );

        const confirmPasswordControl = this.registerUserForm.get(
            ConstantString.CONFIRM_PASSWORD
        );

        confirmPasswordControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                if (
                    passwordControl.value &&
                    value &&
                    value?.toLowerCase() ===
                        passwordControl.value?.toLowerCase()
                ) {
                    confirmPasswordControl.setErrors(null);

                    passwordControl.setErrors(null);
                } else {
                    confirmPasswordControl.setErrors({
                        invalid: true,
                    });
                }
            });

        passwordControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                if (
                    confirmPasswordControl.value &&
                    value &&
                    value?.toLowerCase() !==
                        confirmPasswordControl.value?.toLowerCase()
                ) {
                    passwordControl.setErrors({
                        invalid: true,
                    });
                } else {
                    confirmPasswordControl.setErrors(null);
                }
            });
    }

    public onKeyDown(event: any): void {
        if (event.keyCode === 13) {
            this.registerUser();
        }
    }

    public onGetBtnClickValue(event: { notDisabledClick: boolean }): void {
        if (event.notDisabledClick) {
            this.registerUser();
        }
    }

    public registerUser(): void {
        if (
            this.inputAddress?.inputDropdown?.inputRef?.focusInput &&
            this.inputAddress?.addresList?.length
        ) {
            return;
        }

        if (this.registerUserForm.invalid) {
            this.inputService.markInvalid(this.registerUserForm);

            return;
        }

        this.displaySpinner = true;

        const { address, addressUnit, confirmPassword, ...registerUserForm } =
            this.registerUserForm.value;

        if (this.selectedAddress) {
            this.selectedAddress.addressUnit = this.registerUserForm.get(
                ConstantString.ADDRESS_UNIT
            ).value;
        }

        const saveData: SignupUserCommand = {
            ...registerUserForm,
            address: this.selectedAddress,
            code: this.registerUserCode,
        };

        this.websiteAuthService
            .registerUser(saveData)
            .pipe(
                takeUntil(this.destroy$),
                tap({
                    next: () => {
                        this.websiteActionsService.setSidebarContentType(
                            ConstantString.REGISTER_USER_CONFIRMATION
                        );

                        localStorage.setItem(
                            ConstantString.CONFIRMATION_EMAIL,
                            JSON.stringify(
                                this.registerUserForm.get(
                                    ConstantString.EMAIL_ADDRESS
                                ).value
                            )
                        );

                        this.displaySpinner = false;
                    },
                    error: (error: any) => {
                        this.displaySpinner = false;

                        const errorMessage = error.error.error;

                        if (
                            errorMessage === ConstantString.PHONE_ALREADY_EXIST
                        ) {
                            this.registerUserForm
                                .get(ConstantString.PHONE)
                                .setErrors({ phoneAlreadyExist: true });
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
