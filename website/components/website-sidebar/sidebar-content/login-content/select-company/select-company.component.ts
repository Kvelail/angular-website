import { DOCUMENT } from '@angular/common';
import {
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';

import { Subject, takeUntil, tap } from 'rxjs';

import moment from 'moment';

import { convertTimeFromBackend } from 'src/app/core/utils/methods.calculations';

import { AuthStoreService } from 'src/app/core/components/authentication/state/auth.service';
import { WebsiteAuthService } from 'src/app/core/components/website/state/service/website-auth.service';

import { SelectCompanyResponse, SignInResponse } from 'appcoretruckassist';

@Component({
    selector: 'app-select-company',
    templateUrl: './select-company.component.html',
    styleUrls: ['./select-company.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectCompanyComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    public saveCompany: any;
    public dotsTrue: boolean;
    public slideConfig: any;
    public userData: SignInResponse;
    public lastLoginInCompany: any;
    public dates: any = [];
    public newUser: any;
    public id: any;

    constructor(
        @Inject(DOCUMENT) private document: HTMLDocument,
        private router: Router,
        private accountStoreService: AuthStoreService,
        private websiteAuthService: WebsiteAuthService,
        private formBuilder: UntypedFormBuilder
    ) {}

    ngOnInit() {
        this.user(JSON.parse(localStorage.getItem('user')));

        this.createForm();

        this.userData.companies.length < 5
            ? (this.dotsTrue = false)
            : (this.dotsTrue = true);
    }

    public user(data): void {
        this.userData = data;

        data.companies.forEach((res) => {
            this.lastLoginInCompany = this.calculateDiff(
                convertTimeFromBackend(res.lastLogin)
            );
            this.dates.push(
                moment.utc(res.lastLogin).local().format('MM/DD/YY HH:mm:ss')
            );
        });

        let createNewObject = {
            ...this.userData,
            companies: this.userData.companies.map((item) => {
                return {
                    ...item,
                    lastLogin: moment
                        .utc(item.lastLogin)
                        .local()
                        .format('MM/DD/YY HH:mm:ss'),
                };
            }),
        };

        this.newUser = {
            ...createNewObject,
            companies: createNewObject.companies.map((item) => {
                return {
                    ...item,
                    LastActiveCompany:
                        item.lastLogin == this.getNewerDate(this.dates)
                            ? (this.id = item.id)
                            : null,
                };
            }),
        };

        //Slick Carousel Config
        this.slideConfig = {
            infinite: false,
            slidesToScroll: 1,
            dots: this.dotsTrue,
            arrows: true,
            variableWidth: true,
            focusOnSelect: true,
            centerMode: true,
            initialSlide: this.newUser.companies.findIndex(
                (x) => x.id === this.id
            ),
        };
    }

    public getNewerDate(dates: string[]) {
        let newestDate = moment.utc(dates[0], 'MM/DD/YY HH:mm:ss');

        for (let i = 1; i < dates.length; i++) {
            const currentDate = moment.utc(dates[i], 'MM/DD/YY HH:mm:ss');

            if (currentDate.isAfter(newestDate)) {
                newestDate = currentDate;
            }
        }

        return newestDate.format('MM/DD/YY HH:mm:ss');
    }

    //Calculate last login in company to display
    public calculateDiff(dateSent) {
        let currentDate = new Date();

        dateSent = new Date(dateSent);

        return Math.floor(
            (Date.UTC(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ) -
                Date.UTC(
                    dateSent.getFullYear(),
                    dateSent.getMonth(),
                    dateSent.getDate()
                )) /
                (1000 * 60 * 60 * 24)
        );
    }

    private createForm(): void {
        this.saveCompany = this.formBuilder.group({
            savedCompany: true,
        });
    }

    public goToLogin(): void {
        this.websiteAuthService.accountLogout();
    }

    public onCompanySelect(): void {
        const center: any = this.document.querySelectorAll('.slick-center');
        let id = center[0]?.firstChild?.id;

        this.accountStoreService
            .selectCompanyAccount({
                companyId: parseInt(id),
            })
            .pipe(
                takeUntil(this.destroy$),
                tap((res: SelectCompanyResponse) => {
                    this.userData = {
                        ...res,
                        companies: this.userData.companies.map((item) => {
                            return {
                                ...item,
                                isActive: item.companyName === res.companyName,
                            };
                        }),
                    };

                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(this.userData));

                    this.router.navigate(['/dashboard']);
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
