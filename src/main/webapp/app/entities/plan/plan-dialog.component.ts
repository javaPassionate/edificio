import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Plan } from './plan.model';
import { PlanPopupService } from './plan-popup.service';
import { PlanService } from './plan.service';
import { Projet, ProjetService } from '../projet';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-plan-dialog',
    templateUrl: './plan-dialog.component.html'
})
export class PlanDialogComponent implements OnInit {

    plan: Plan;
    isSaving: boolean;

    projets: Projet[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private planService: PlanService,
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
        if (this.plan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.planService.update(this.plan));
        } else {
            this.subscribeToSaveResponse(
                this.planService.create(this.plan));
        }
    }

    private subscribeToSaveResponse(result: Observable<Plan>) {
        result.subscribe((res: Plan) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Plan) {
        this.eventManager.broadcast({ name: 'planListModification', content: 'OK'});
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
    selector: 'jhi-plan-popup',
    template: ''
})
export class PlanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private planPopupService: PlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.planPopupService
                    .open(PlanDialogComponent as Component, params['id']);
            } else {
                this.planPopupService
                    .open(PlanDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
