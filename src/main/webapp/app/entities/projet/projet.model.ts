import { BaseEntity } from './../../shared';

export class Projet implements BaseEntity {
    constructor(
        public id?: number,
        public projet?: string,
        public numeroProjet?: string,
        public mo?: string,
        public mod?: string,
        public architecture?: string,
        public bet?: string,
        public courrierDeparts?: BaseEntity[],
        public courrierArrives?: BaseEntity[],
        public pvReunions?: BaseEntity[],
        public plans?: BaseEntity[],
    ) {
    }
}
