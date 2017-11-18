import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MrsPiloteSharedModule } from '../../shared';
import {
    PlanService,
    PlanPopupService,
    PlanComponent,
    PlanDetailComponent,
    PlanDialogComponent,
    PlanPopupComponent,
    PlanDeletePopupComponent,
    PlanDeleteDialogComponent,
    planRoute,
    planPopupRoute,
} from './';

const ENTITY_STATES = [
    ...planRoute,
    ...planPopupRoute,
];

@NgModule({
    imports: [
        MrsPiloteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlanComponent,
        PlanDetailComponent,
        PlanDialogComponent,
        PlanDeleteDialogComponent,
        PlanPopupComponent,
        PlanDeletePopupComponent,
    ],
    entryComponents: [
        PlanComponent,
        PlanDialogComponent,
        PlanPopupComponent,
        PlanDeleteDialogComponent,
        PlanDeletePopupComponent,
    ],
    providers: [
        PlanService,
        PlanPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPilotePlanModule {}
