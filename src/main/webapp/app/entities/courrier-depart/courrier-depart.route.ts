import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CourrierDepartComponent } from './courrier-depart.component';
import { CourrierDepartDetailComponent } from './courrier-depart-detail.component';
import { CourrierDepartPopupComponent } from './courrier-depart-dialog.component';
import { CourrierDepartDeletePopupComponent } from './courrier-depart-delete-dialog.component';

export const courrierDepartRoute: Routes = [
    {
        path: 'courrier-depart',
        component: CourrierDepartComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierDeparts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'courrier-depart/:id',
        component: CourrierDepartDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierDeparts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const courrierDepartPopupRoute: Routes = [
    {
        path: 'courrier-depart-new',
        component: CourrierDepartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierDeparts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'courrier-depart/:id/edit',
        component: CourrierDepartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierDeparts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'courrier-depart/:id/delete',
        component: CourrierDepartDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CourrierDeparts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
