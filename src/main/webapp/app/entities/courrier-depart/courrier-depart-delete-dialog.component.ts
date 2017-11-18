import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CourrierDepart } from './courrier-depart.model';
import { CourrierDepartPopupService } from './courrier-depart-popup.service';
import { CourrierDepartService } from './courrier-depart.service';

@Component({
    selector: 'jhi-courrier-depart-delete-dialog',
    templateUrl: './courrier-depart-delete-dialog.component.html'
})
export class CourrierDepartDeleteDialogComponent {

    courrierDepart: CourrierDepart;

    constructor(
        private courrierDepartService: CourrierDepartService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courrierDepartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'courrierDepartListModification',
                content: 'Deleted an courrierDepart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-courrier-depart-delete-popup',
    template: ''
})
export class CourrierDepartDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private courrierDepartPopupService: CourrierDepartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.courrierDepartPopupService
                .open(CourrierDepartDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
