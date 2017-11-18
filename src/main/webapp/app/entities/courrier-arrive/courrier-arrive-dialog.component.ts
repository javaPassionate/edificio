import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourrierArrive } from './courrier-arrive.model';
import { CourrierArrivePopupService } from './courrier-arrive-popup.service';
import { CourrierArriveService } from './courrier-arrive.service';
import { Projet, ProjetService } from '../projet';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-courrier-arrive-dialog',
    templateUrl: './courrier-arrive-dialog.component.html'
})
export class CourrierArriveDialogComponent implements OnInit {

    courrierArrive: CourrierArrive;
    isSaving: boolean;

    projets: Projet[];
    dateReceptionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private courrierArriveService: CourrierArriveService,
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
        if (this.courrierArrive.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courrierArriveService.update(this.courrierArrive));
        } else {
            this.subscribeToSaveResponse(
                this.courrierArriveService.create(this.courrierArrive));
        }
    }

    private subscribeToSaveResponse(result: Observable<CourrierArrive>) {
        result.subscribe((res: CourrierArrive) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CourrierArrive) {
        this.eventManager.broadcast({ name: 'courrierArriveListModification', content: 'OK'});
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
    selector: 'jhi-courrier-arrive-popup',
    template: ''
})
export class CourrierArrivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private courrierArrivePopupService: CourrierArrivePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.courrierArrivePopupService
                    .open(CourrierArriveDialogComponent as Component, params['id']);
            } else {
                this.courrierArrivePopupService
                    .open(CourrierArriveDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
