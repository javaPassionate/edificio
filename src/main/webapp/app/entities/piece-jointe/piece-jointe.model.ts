import { BaseEntity } from './../../shared';

export class PieceJointe implements BaseEntity {
    constructor(
        public id?: number,
        public idPieceJointe?: number,
        public nameFile?: string,
        public contentContentType?: string,
        public content?: any,
        public path?: string,
        public courrierDepart?: BaseEntity,
        public courrierArrive?: BaseEntity,
        public pvReunion?: BaseEntity,
    ) {
    }
}
