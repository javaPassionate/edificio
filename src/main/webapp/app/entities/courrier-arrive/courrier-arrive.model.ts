import { BaseEntity } from './../../shared';

export class CourrierArrive implements BaseEntity {
    constructor(
        public id?: number,
        public numeroCourrierDepart?: string,
        public envoyePar?: string,
        public dateReception?: any,
        public idPieceJointes?: BaseEntity[],
        public numeroProjet?: BaseEntity,
    ) {
    }
}
