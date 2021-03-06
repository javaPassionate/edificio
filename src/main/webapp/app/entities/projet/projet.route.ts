import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjetComponent } from './projet.component';
import { ProjetDetailComponent } from './projet-detail.component';
import { ProjetPopupComponent } from './projet-dialog.component';
import { ProjetDeletePopupComponent } from './projet-delete-dialog.component';

export const projetRoute: Routes = [
    {
        path: 'projet',
        component: ProjetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'projet/:id',
        component: ProjetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projetPopupRoute: Routes = [
    {
        path: 'projet-new',
        component: ProjetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'projet/:id/edit',
        component: ProjetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'projet/:id/delete',
        component: ProjetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
