import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourrierDepart } from './courrier-depart.model';
import { CourrierDepartPopupService } from './courrier-depart-popup.service';
import { CourrierDepartService } from './courrier-depart.service';
import { Projet, ProjetService } from '../projet';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-courrier-depart-dialog',
    templateUrl: './courrier-depart-dialog.component.html'
})
export class CourrierDepartDialogComponent implements OnInit {

    courrierDepart: CourrierDepart;
    isSaving: boolean;

    projets: Projet[];
    dateEnvoiDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private courrierDepartService: CourrierDepartService,
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
        if (this.courrierDepart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courrierDepartService.update(this.courrierDepart));
        } else {
            this.subscribeToSaveResponse(
                this.courrierDepartService.create(this.courrierDepart));
        }
    }

    private subscribeToSaveResponse(result: Observable<CourrierDepart>) {
        result.subscribe((res: CourrierDepart) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CourrierDepart) {
        this.eventManager.broadcast({ name: 'courrierDepartListModification', content: 'OK'});
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
    selector: 'jhi-courrier-depart-popup',
    template: ''
})
export class CourrierDepartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private courrierDepartPopupService: CourrierDepartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.courrierDepartPopupService
                    .open(CourrierDepartDialogComponent as Component, params['id']);
            } else {
                this.courrierDepartPopupService
                    .open(CourrierDepartDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
