import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CourrierArrive } from './courrier-arrive.model';
import { CourrierArrivePopupService } from './courrier-arrive-popup.service';
import { CourrierArriveService } from './courrier-arrive.service';

@Component({
    selector: 'jhi-courrier-arrive-delete-dialog',
    templateUrl: './courrier-arrive-delete-dialog.component.html'
})
export class CourrierArriveDeleteDialogComponent {

    courrierArrive: CourrierArrive;

    constructor(
        private courrierArriveService: CourrierArriveService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courrierArriveService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'courrierArriveListModification',
                content: 'Deleted an courrierArrive'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-courrier-arrive-delete-popup',
    template: ''
})
export class CourrierArriveDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private courrierArrivePopupService: CourrierArrivePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.courrierArrivePopupService
                .open(CourrierArriveDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
