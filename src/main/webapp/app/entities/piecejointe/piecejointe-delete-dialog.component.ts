import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Piecejointe } from './piecejointe.model';
import { PiecejointePopupService } from './piecejointe-popup.service';
import { PiecejointeService } from './piecejointe.service';

@Component({
    selector: 'jhi-piecejointe-delete-dialog',
    templateUrl: './piecejointe-delete-dialog.component.html'
})
export class PiecejointeDeleteDialogComponent {

    piecejointe: Piecejointe;

    constructor(
        private piecejointeService: PiecejointeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.piecejointeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'piecejointeListModification',
                content: 'Deleted an piecejointe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-piecejointe-delete-popup',
    template: ''
})
export class PiecejointeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private piecejointePopupService: PiecejointePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.piecejointePopupService
                .open(PiecejointeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
