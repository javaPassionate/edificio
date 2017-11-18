import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MrsPiloteSharedModule } from '../../shared';
import {
    CourrierDepartService,
    CourrierDepartPopupService,
    CourrierDepartComponent,
    CourrierDepartDetailComponent,
    CourrierDepartDialogComponent,
    CourrierDepartPopupComponent,
    CourrierDepartDeletePopupComponent,
    CourrierDepartDeleteDialogComponent,
    courrierDepartRoute,
    courrierDepartPopupRoute,
} from './';

const ENTITY_STATES = [
    ...courrierDepartRoute,
    ...courrierDepartPopupRoute,
];

@NgModule({
    imports: [
        MrsPiloteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CourrierDepartComponent,
        CourrierDepartDetailComponent,
        CourrierDepartDialogComponent,
        CourrierDepartDeleteDialogComponent,
        CourrierDepartPopupComponent,
        CourrierDepartDeletePopupComponent,
    ],
    entryComponents: [
        CourrierDepartComponent,
        CourrierDepartDialogComponent,
        CourrierDepartPopupComponent,
        CourrierDepartDeleteDialogComponent,
        CourrierDepartDeletePopupComponent,
    ],
    providers: [
        CourrierDepartService,
        CourrierDepartPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPiloteCourrierDepartModule {}
