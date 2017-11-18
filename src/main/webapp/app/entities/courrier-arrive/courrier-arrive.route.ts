import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CourrierArriveComponent } from './courrier-arrive.component';
import { CourrierArriveDetailComponent } from './courrier-arrive-detail.component';
import { CourrierArrivePopupComponent } from './courrier-arrive-dialog.component';
import { CourrierArriveDeletePopupComponent } from './courrier-arrive-delete-dialog.component';

export const courrierArriveRoute: Routes = [
    {
        path: 'courrier-arrive',
        component: CourrierArriveComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierArrives'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'courrier-arrive/:id',
        component: CourrierArriveDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierArrives'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const courrierArrivePopupRoute: Routes = [
    {
        path: 'courrier-arrive-new',
        component: CourrierArrivePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierArrives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'courrier-arrive/:id/edit',
        component: CourrierArrivePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierArrives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'courrier-arrive/:id/delete',
        component: CourrierArriveDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierArrives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
