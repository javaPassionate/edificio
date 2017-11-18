import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Piecejointe } from './piecejointe.model';
import { PiecejointePopupService } from './piecejointe-popup.service';
import { PiecejointeService } from './piecejointe.service';
import { CourrierDepart, CourrierDepartService } from '../courrier-depart';
import { CourrierArrive, CourrierArriveService } from '../courrier-arrive';
import { PvReunion, PvReunionService } from '../pv-reunion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-piecejointe-dialog',
    templateUrl: './piecejointe-dialog.component.html'
})
export class PiecejointeDialogComponent implements OnInit {

    piecejointe: Piecejointe;
    isSaving: boolean;

    courrierdeparts: CourrierDepart[];

    courrierarrives: CourrierArrive[];

    pvreunions: PvReunion[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private piecejointeService: PiecejointeService,
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
        if (this.piecejointe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.piecejointeService.update(this.piecejointe));
        } else {
            this.subscribeToSaveResponse(
                this.piecejointeService.create(this.piecejointe));
        }
    }

    private subscribeToSaveResponse(result: Observable<Piecejointe>) {
        result.subscribe((res: Piecejointe) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Piecejointe) {
        this.eventManager.broadcast({ name: 'piecejointeListModification', content: 'OK'});
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
    selector: 'jhi-piecejointe-popup',
    template: ''
})
export class PiecejointePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private piecejointePopupService: PiecejointePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.piecejointePopupService
                    .open(PiecejointeDialogComponent as Component, params['id']);
            } else {
                this.piecejointePopupService
                    .open(PiecejointeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
