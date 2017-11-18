import { BaseEntity } from './../../shared';

export class Plan implements BaseEntity {
    constructor(
        public id?: number,
        public numeroPlan?: string,
        public typePlan?: string,
        public contenuPlan?: string,
        public numeroProjet?: BaseEntity,
    ) {
    }
}
