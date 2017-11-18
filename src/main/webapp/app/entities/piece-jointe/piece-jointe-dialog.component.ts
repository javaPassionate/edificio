import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { PieceJointe } from './piece-jointe.model';
import { PieceJointePopupService } from './piece-jointe-popup.service';
import { PieceJointeService } from './piece-jointe.service';
import { CourrierDepart, CourrierDepartService } from '../courrier-depart';
import { CourrierArrive, CourrierArriveService } from '../courrier-arrive';
import { PvReunion, PvReunionService } from '../pv-reunion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-piece-jointe-dialog',
    templateUrl: './piece-jointe-dialog.component.html'
})
export class PieceJointeDialogComponent implements OnInit {

    pieceJointe: PieceJointe;
    isSaving: boolean;

    courrierdeparts: CourrierDepart[];

    courrierarrives: CourrierArrive[];

    pvreunions: PvReunion[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private pieceJointeService: PieceJointeService,
        private courrierDepartService: CourrierDepartService,
        private courrierArriveService: CourrierArriveService,
        private pvReunionService: PvReunionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courrierDepartService.query()
            .subscribe((res: ResponseWrapper) => { this.courrierdeparts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.courrierArriveService.query()
            .subscribe((res: ResponseWrapper) => { this.courrierarrives = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pvReunionService.query()
            .subscribe((res: ResponseWrapper) => { this.pvreunions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pieceJointe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pieceJointeService.update(this.pieceJointe));
        } else {
            this.subscribeToSaveResponse(
                this.pieceJointeService.create(this.pieceJointe));
        }
    }

    private subscribeToSaveResponse(result: Observable<PieceJointe>) {
        result.subscribe((res: PieceJointe) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PieceJointe) {
        this.eventManager.broadcast({ name: 'pieceJointeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCourrierDepartById(index: number, item: CourrierDepart) {
        return item.id;
    }

    trackCourrierArriveById(index: number, item: CourrierArrive) {
        return item.id;
    }

    trackPvReunionById(index: number, item: PvReunion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-piece-jointe-popup',
    template: ''
})
export class PieceJointePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pieceJointePopupService: PieceJointePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pieceJointePopupService
                    .open(PieceJointeDialogComponent as Component, params['id']);
            } else {
                this.pieceJointePopupService
                    .open(PieceJointeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
