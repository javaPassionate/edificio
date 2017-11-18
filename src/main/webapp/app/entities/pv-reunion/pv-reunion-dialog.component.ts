import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PvReunion } from './pv-reunion.model';
import { PvReunionPopupService } from './pv-reunion-popup.service';
import { PvReunionService } from './pv-reunion.service';
import { Projet, ProjetService } from '../projet';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pv-reunion-dialog',
    templateUrl: './pv-reunion-dialog.component.html'
})
export class PvReunionDialogComponent implements OnInit {

    pvReunion: PvReunion;
    isSaving: boolean;

    projets: Projet[];
    datePvDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pvReunionService: PvReunionService,
        private projetService: ProjetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projetService.query()
            .subscribe((res: ResponseWrapper) => { this.projets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pvReunion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pvReunionService.update(this.pvReunion));
        } else {
            this.subscribeToSaveResponse(
                this.pvReunionService.create(this.pvReunion));
        }
    }

    private subscribeToSaveResponse(result: Observable<PvReunion>) {
        result.subscribe((res: PvReunion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PvReunion) {
        this.eventManager.broadcast({ name: 'pvReunionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjetById(index: number, item: Projet) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pv-reunion-popup',
    template: ''
})
export class PvReunionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pvReunionPopupService: PvReunionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pvReunionPopupService
                    .open(PvReunionDialogComponent as Component, params['id']);
            } else {
                this.pvReunionPopupService
                    .open(PvReunionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
