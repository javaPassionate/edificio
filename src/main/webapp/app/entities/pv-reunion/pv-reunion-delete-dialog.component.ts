import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PvReunion } from './pv-reunion.model';
import { PvReunionPopupService } from './pv-reunion-popup.service';
import { PvReunionService } from './pv-reunion.service';

@Component({
    selector: 'jhi-pv-reunion-delete-dialog',
    templateUrl: './pv-reunion-delete-dialog.component.html'
})
export class PvReunionDeleteDialogComponent {

    pvReunion: PvReunion;

    constructor(
        private pvReunionService: PvReunionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pvReunionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pvReunionListModification',
                content: 'Deleted an pvReunion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pv-reunion-delete-popup',
    template: ''
})
export class PvReunionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pvReunionPopupService: PvReunionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pvReunionPopupService
                .open(PvReunionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
