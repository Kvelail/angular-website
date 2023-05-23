import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, tap } from 'rxjs';

import { WebsiteActionsService } from './website-actions.service';

import { PersistState } from '@datorama/akita';

import {
    AccountService,
    AvatarResponse,
    ForgotPasswordCommand,
    ResendSignUpCompanyOrUserCommand,
    SelectCompanyCommand,
    SelectCompanyResponse,
    SetNewPasswordCommand,
    SignInCommand,
    SignInResponse,
    SignUpCompanyCommand,
    SignupUserCommand,
    VerifyForgotPasswordCommand,
    VerifyOwnerCommand,
    VerifyUserCommand,
} from 'appcoretruckassist';
import { ConstantString } from '../enum/const-string.enum';

@Injectable({
    providedIn: 'root',
})
export class WebsiteAuthService {
    private _multipleCompanies: any = null;

    private multipleCompanies = new Subject<any>();

    public userHasMultipleCompaniesObservable =
        this.multipleCompanies.asObservable();

    get moreThenOneCompany() {
        return this._multipleCompanies;
    }

    set moreThenOneCompany(value) {
        this._multipleCompanies = value;
        this.multipleCompanies.next(value);
    }

    constructor(
        @Inject('persistStorage')
        private persistStorage: PersistState,
        private router: Router,
        private accountService: AccountService,
        private websiteActionsService: WebsiteActionsService
    ) {}

    public registerCompany(data: SignUpCompanyCommand): Observable<object> {
        return this.accountService.apiAccountSignupcompanyPost(
            data,
            'response'
        );
    }

    public resendRegisterCompanyOrUser(
        data: ResendSignUpCompanyOrUserCommand
    ): Observable<any> {
        return this.accountService.apiAccountResendsignupcompanyoruserPut(data);
    }

    public registerCompanyVerifyOwner(
        data: VerifyOwnerCommand
    ): Observable<object> {
        return this.accountService
            .apiAccountVerifyownerPut(data, 'response')
            .pipe(
                tap(() => {
                    this.websiteActionsService.setOpenSidebarSubject(true);

                    this.websiteActionsService.setSidebarContentType(
                        ConstantString.START_TRIAL_WELCOME
                    );

                    this.websiteActionsService.setIsEmailRouteSubject(true);

                    this.accountLogout(true);
                })
            );
    }

    public registerUser(data: SignupUserCommand): Observable<any> {
        return this.accountService.apiAccountSignupuserPut(data, 'response');
    }

    public registerUserVerifyUser(data: VerifyUserCommand): Observable<any> {
        return this.accountService
            .apiAccountVerifyuserPut(data, 'response')
            .pipe(
                tap(() => {
                    this.websiteActionsService.setOpenSidebarSubject(true);

                    this.websiteActionsService.setSidebarContentType(
                        ConstantString.REGISTER_USER_WELCOME
                    );

                    this.websiteActionsService.setIsEmailRouteSubject(true);

                    this.accountLogout(true);
                })
            );
    }

    public accountLogin(data: SignInCommand): Observable<SignInResponse> {
        return this.accountService.apiAccountLoginPost(data).pipe(
            tap((user: SignInResponse) => {
                // ---- PRODUCTION MODE ----
                // this.authStore.set({ 1: user });
                // ---- DEVELOP MODE ----
                if (user.companies.length > 1) {
                    this.moreThenOneCompany = user;

                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/website/select-company']);
                } else {
                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/dashboard']);
                }

                this.websiteActionsService.setOpenSidebarSubject(false);
            })
        );
    }

    public accountLogout(isEmailRoute: boolean = false): void {
        this.router.navigate([ConstantString.WEBSITE]);

        // ---- PRODUCTION MODE ----
        this.persistStorage.clearStore();
        this.persistStorage.destroy();

        // ---- DEVELOP MODE ----
        localStorage.removeItem('user');

        if (!isEmailRoute) {
            this.websiteActionsService.setIsEmailRouteSubject(false);
        }
    }

    public resetPassword(data: ForgotPasswordCommand): Observable<object> {
        return this.accountService.apiAccountForgotpasswordPut(
            data,
            'response'
        );
    }

    public verifyResetPassword(
        data: VerifyForgotPasswordCommand
    ): Observable<object> {
        return this.accountService.apiAccountVerifyforgotpasswordPut(data).pipe(
            tap((res: { token: string }) => {
                this.websiteActionsService.setOpenSidebarSubject(true);

                this.websiteActionsService.setSidebarContentType(
                    ConstantString.CREATE_NEW_PASSWORD
                );

                this.websiteActionsService.setResetPasswordToken(res.token);

                this.websiteActionsService.setIsEmailRouteSubject(true);

                this.accountLogout(true);
            })
        );
    }

    public createNewPassword(data: SetNewPasswordCommand): Observable<object> {
        return this.accountService
            .apiAccountSetnewpasswordPut(data, 'response')
            .pipe(
                tap(() => {
                    localStorage.removeItem('user');

                    this.websiteActionsService.setSidebarContentType(
                        ConstantString.PASSWORD_UPDATED
                    );
                })
            );
    }

    public selectCompanyAccount(
        data: SelectCompanyCommand
    ): Observable<SelectCompanyResponse> {
        return this.accountService.apiAccountSelectcompanyPost(data);
    }

    public getAccountAvatarImage(data: string): Observable<AvatarResponse> {
        return this.accountService.apiAccountAvatarCodeGet(data).pipe(
            tap((res: AvatarResponse) => {
                this.websiteActionsService.setAvatarImageSubject(res.avatar);
            })
        );
    }
}
