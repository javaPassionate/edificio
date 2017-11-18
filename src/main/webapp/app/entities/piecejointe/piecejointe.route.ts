import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PiecejointeComponent } from './piecejointe.component';
import { PiecejointeDetailComponent } from './piecejointe-detail.component';
import { PiecejointePopupComponent } from './piecejointe-dialog.component';
import { PiecejointeDeletePopupComponent } from './piecejointe-delete-dialog.component';

export const piecejointeRoute: Routes = [
    {
        path: 'piecejointe',
        component: PiecejointeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Piecejointes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'piecejointe/:id',
        component: PiecejointeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Piecejointes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const piecejointePopupRoute: Routes = [
    {
        path: 'piecejointe-new',
        component: PiecejointePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Piecejointes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'piecejointe/:id/edit',
        component: PiecejointePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Piecejointes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'piecejointe/:id/delete',
        component: PiecejointeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Piecejointes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
