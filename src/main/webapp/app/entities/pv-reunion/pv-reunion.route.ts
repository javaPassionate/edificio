import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PvReunionComponent } from './pv-reunion.component';
import { PvReunionDetailComponent } from './pv-reunion-detail.component';
import { PvReunionPopupComponent } from './pv-reunion-dialog.component';
import { PvReunionDeletePopupComponent } from './pv-reunion-delete-dialog.component';

export const pvReunionRoute: Routes = [
    {
        path: 'pv-reunion',
        component: PvReunionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PvReunions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pv-reunion/:id',
        component: PvReunionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PvReunions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pvReunionPopupRoute: Routes = [
    {
        path: 'pv-reunion-new',
        component: PvReunionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PvReunions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pv-reunion/:id/edit',
        component: PvReunionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PvReunions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pv-reunion/:id/delete',
        component: PvReunionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PvReunions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
