import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MrsPiloteSharedModule } from '../../shared';
import {
    CourrierArriveService,
    CourrierArrivePopupService,
    CourrierArriveComponent,
    CourrierArriveDetailComponent,
    CourrierArriveDialogComponent,
    CourrierArrivePopupComponent,
    CourrierArriveDeletePopupComponent,
    CourrierArriveDeleteDialogComponent,
    courrierArriveRoute,
    courrierArrivePopupRoute,
} from './';

const ENTITY_STATES = [
    ...courrierArriveRoute,
    ...courrierArrivePopupRoute,
];

@NgModule({
    imports: [
        MrsPiloteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CourrierArriveComponent,
        CourrierArriveDetailComponent,
        CourrierArriveDialogComponent,
        CourrierArriveDeleteDialogComponent,
        CourrierArrivePopupComponent,
        CourrierArriveDeletePopupComponent,
    ],
    entryComponents: [
        CourrierArriveComponent,
        CourrierArriveDialogComponent,
        CourrierArrivePopupComponent,
        CourrierArriveDeleteDialogComponent,
        CourrierArriveDeletePopupComponent,
    ],
    providers: [
        CourrierArriveService,
        CourrierArrivePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPiloteCourrierArriveModule {}
