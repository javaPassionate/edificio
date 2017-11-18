import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Piecejointe } from './piecejointe.model';
import { PiecejointeService } from './piecejointe.service';

@Component({
    selector: 'jhi-piecejointe-detail',
    templateUrl: './piecejointe-detail.component.html'
})
export class PiecejointeDetailComponent implements OnInit, OnDestroy {

    piecejointe: Piecejointe;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private piecejointeService: PiecejointeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPiecejointes();
    }

    load(id) {
        this.piecejointeService.find(id).subscribe((piecejointe) => {
            this.piecejointe = piecejointe;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPiecejointes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'piecejointeListModification',
            (response) => this.load(this.piecejointe.id)
        );
    }
}
