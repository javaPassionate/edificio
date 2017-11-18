import { BaseEntity } from './../../shared';

export class CourrierDepart implements BaseEntity {
    constructor(
        public id?: number,
        public numeroCourrierDepart?: string,
        public destinataire?: string,
        public dateEnvoi?: any,
        public idPieceJointes?: BaseEntity[],
        public numeroProjet?: BaseEntity,
    ) {
    }
}
