import { BaseEntity } from './../../shared';

export class PvReunion implements BaseEntity {
    constructor(
        public id?: number,
        public numeroPv?: string,
        public datePv?: any,
        public idPieceJointes?: BaseEntity[],
        public numeroProjet?: BaseEntity,
    ) {
    }
}
