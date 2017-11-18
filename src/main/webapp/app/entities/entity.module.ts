import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MrsPiloteProjetModule } from './projet/projet.module';
import { MrsPilotePieceJointeModule } from './piece-jointe/piece-jointe.module';
import { MrsPiloteCourrierDepartModule } from './courrier-depart/courrier-depart.module';
import { MrsPiloteCourrierArriveModule } from './courrier-arrive/courrier-arrive.module';
import { MrsPilotePvReunionModule } from './pv-reunion/pv-reunion.module';
import { MrsPilotePlanModule } from './plan/plan.module';
import { MrsPilotePiecejointeModule } from './piecejointe/piecejointe.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MrsPiloteProjetModule,
        MrsPilotePieceJointeModule,
        MrsPiloteCourrierDepartModule,
        MrsPiloteCourrierArriveModule,
        MrsPilotePvReunionModule,
        MrsPilotePlanModule,
        MrsPilotePiecejointeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MrsPiloteEntityModule {}
