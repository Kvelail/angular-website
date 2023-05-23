import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WebsiteRoutingModule } from './website-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { WebsiteMainComponent } from './components/website-main/website-main.component';
import { WebsiteNavbarComponent } from './components/website-navbar/website-navbar.component';
import { SidebarConfirmBtnComponent } from './components/website-sidebar/sidebar-btn/sidebar-confirm-btn/sidebar-confirm-btn.component';
import { SidebarResendBtnComponent } from './components/website-sidebar/sidebar-btn/sidebar-resend-btn/sidebar-resend-btn.component';
import { SidebarDropdownComponent } from './components/website-sidebar/sidebar-dropdown/sidebar-dropdown.component';

import { WebsiteSidebarComponent } from './components/website-sidebar/website-sidebar.component';
import { RegisterCompanyComponent } from './components/website-sidebar/sidebar-content/register-company-content/register-company/register-company.component';
import { ConfirmationComponent } from './components/website-sidebar/sidebar-content/confirmation-content/confirmation.component';
import { RegisterCompanyHelperComponent } from './components/website-sidebar/sidebar-content/register-company-content/register-company-helper/register-company-helper.component';
import { WelcomeComponent } from './components/website-sidebar/sidebar-content/welcome-content/welcome.component';
import { LoginComponent } from './components/website-sidebar/sidebar-content/login-content/login/login.component';
import { ResetPasswordComponent } from './components/website-sidebar/sidebar-content/login-content/reset-password/reset-password.component';
import { CreateNewPasswordComponent } from './components/website-sidebar/sidebar-content/login-content/create-new-password/create-new-password.component';
import { ResetPasswordHelperComponent } from './components/website-sidebar/sidebar-content/login-content/reset-password-helper/reset-password-helper.component';
import { ResendConfirmationComponent } from './components/website-sidebar/sidebar-content/login-content/resend-confirmation/resend-confirmation.component';
import { PasswordUpdatedComponent } from './components/website-sidebar/sidebar-content/login-content/password-updated/password-updated.component';
import { RegisterUserComponent } from './components/website-sidebar/sidebar-content/register-user-content/register-user/register-user.component';
import { RegisterUserHelperComponent } from './components/website-sidebar/sidebar-content/register-user-content/register-user-helper/register-user-helper.component';
import { RegisterUserHaveAccountHelperComponent } from './components/website-sidebar/sidebar-content/register-user-content/register-user-have-account-helper/register-user-have-account-helper.component';
import { VerifyUserHelperComponent } from './components/website-sidebar/sidebar-content/register-user-content/verify-user-helper/verify-user-helper.component';
import { SelectCompanyComponent } from './components/website-sidebar/sidebar-content/login-content/select-company/select-company.component';

import { WebsiteUnderConstructionComponent } from './components/website-under-construction/website-under-construction.component';

import { TaInputComponent } from '../shared/ta-input/ta-input.component';
import { InputAddressDropdownComponent } from '../shared/input-address-dropdown/input-address-dropdown.component';
import { TaCheckboxComponent } from '../shared/ta-checkbox/ta-checkbox.component';
import { TaSpinnerComponent } from '../shared/ta-spinner/ta-spinner.component';

@NgModule({
    declarations: [
        WebsiteMainComponent,
        WebsiteNavbarComponent,

        /* SIDEBAR */

        WebsiteSidebarComponent,
        SidebarConfirmBtnComponent,
        SidebarResendBtnComponent,
        SidebarDropdownComponent,
        RegisterCompanyComponent,
        ConfirmationComponent,
        RegisterCompanyHelperComponent,
        WelcomeComponent,
        LoginComponent,
        ResetPasswordComponent,
        CreateNewPasswordComponent,
        ResetPasswordHelperComponent,
        ResendConfirmationComponent,
        PasswordUpdatedComponent,
        RegisterUserComponent,
        RegisterUserHelperComponent,
        RegisterUserHaveAccountHelperComponent,
        VerifyUserHelperComponent,
        SelectCompanyComponent,

        /* SIDEBAR */

        WebsiteUnderConstructionComponent,
    ],
    imports: [
        /* MODULES */

        CommonModule,
        WebsiteRoutingModule,
        SharedModule,
        SlickCarouselModule,
        RouterModule,

        /* COMPONENTS */

        TaInputComponent,
        InputAddressDropdownComponent,
        TaCheckboxComponent,
        TaSpinnerComponent,
    ],
})
export class WebsiteModule {}
