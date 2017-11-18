import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PlanComponent } from './plan.component';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanPopupComponent } from './plan-dialog.component';
import { PlanDeletePopupComponent } from './plan-delete-dialog.component';

export const planRoute: Routes = [
    {
        path: 'plan',
        component: PlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'plan/:id',
        component: PlanDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const planPopupRoute: Routes = [
    {
        path: 'plan-new',
        component: PlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'plan/:id/edit',
        component: PlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'plan/:id/delete',
        component: PlanDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
