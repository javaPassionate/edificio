import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Plan } from './plan.model';
import { PlanPopupService } from './plan-popup.service';
import { PlanService } from './plan.service';

@Component({
    selector: 'jhi-plan-delete-dialog',
    templateUrl: './plan-delete-dialog.component.html'
})
export class PlanDeleteDialogComponent {

    plan: Plan;

    constructor(
        private planService: PlanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.planService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'planListModification',
                content: 'Deleted an plan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plan-delete-popup',
    template: ''
})
export class PlanDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private planPopupService: PlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.planPopupService
                .open(PlanDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
