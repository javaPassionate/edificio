import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MrsPiloteSharedModule } from '../../shared';
import {
    PvReunionService,
    PvReunionPopupService,
    PvReunionComponent,
    PvReunionDetailComponent,
    PvReunionDialogComponent,
    PvReunionPopupComponent,
    PvReunionDeletePopupComponent,
    PvReunionDeleteDialogComponent,
    pvReunionRoute,
    pvReunionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pvReunionRoute,
    ...pvReunionPopupRoute,
];

@NgModule({
    imports: [
        MrsPiloteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PvReunionComponent,
        PvReunionDetailComponent,
        PvReunionDialogComponent,
        PvReunionDeleteDialogComponent,
        PvReunionPopupComponent,
        PvReunionDeletePopupComponent,
    ],
    entryComponents: [
        PvReunionComponent,
        PvReunionDialogComponent,
        PvReunionPopupComponent,
        PvReunionDeleteDialogComponent,
        PvReunionDeletePopupComponent,
    ],
    providers: [
        PvReunionService,
        PvReunionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPilotePvReunionModule {}
