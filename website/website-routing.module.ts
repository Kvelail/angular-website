import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/authentication.guard';

import { WebsiteMainComponent } from './components/website-main/website-main.component';
import { SelectCompanyComponent } from './components/website-sidebar/sidebar-content/login-content/select-company/select-company.component';

import { WebsiteUnderConstructionComponent } from './components/website-under-construction/website-under-construction.component';

const routes: Routes = [
    {
        path: '',
        component: WebsiteMainComponent,
        data: { title: 'Website' },
        children: [
            {
                path: 'select-company',
                component: SelectCompanyComponent,
                data: { title: 'Select Company' },
                canActivate: [AuthGuard],
            },
            {
                path: 'features',
                component: WebsiteUnderConstructionComponent,
                data: { title: 'Features' },
            },
            {
                path: 'pricing',
                component: WebsiteUnderConstructionComponent,
                data: { title: 'Pricing' },
            },
            {
                path: 'support',
                component: WebsiteUnderConstructionComponent,
                data: { title: 'Support' },
            },

            { path: '**', redirectTo: '/website', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule],
})
export class WebsiteRoutingModule {}
