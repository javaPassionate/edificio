import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MrsPiloteSharedModule } from '../../shared';
import {
    PiecejointeService,
    PiecejointePopupService,
    PiecejointeComponent,
    PiecejointeDetailComponent,
    PiecejointeDialogComponent,
    PiecejointePopupComponent,
    PiecejointeDeletePopupComponent,
    PiecejointeDeleteDialogComponent,
    piecejointeRoute,
    piecejointePopupRoute,
} from './';

const ENTITY_STATES = [
    ...piecejointeRoute,
    ...piecejointePopupRoute,
];

@NgModule({
    imports: [
        MrsPiloteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PiecejointeComponent,
        PiecejointeDetailComponent,
        PiecejointeDialogComponent,
        PiecejointeDeleteDialogComponent,
        PiecejointePopupComponent,
        PiecejointeDeletePopupComponent,
    ],
    entryComponents: [
        PiecejointeComponent,
        PiecejointeDialogComponent,
        PiecejointePopupComponent,
        PiecejointeDeleteDialogComponent,
        PiecejointeDeletePopupComponent,
    ],
    providers: [
        PiecejointeService,
        PiecejointePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPilotePiecejointeModule {}
