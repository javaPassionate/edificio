import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { PvReunion } from './pv-reunion.model';
import { PvReunionService } from './pv-reunion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pv-reunion',
    templateUrl: './pv-reunion.component.html'
})
export class PvReunionComponent implements OnInit, OnDestroy {
pvReunions: PvReunion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pvReunionService: PvReunionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pvReunionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pvReunions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPvReunions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PvReunion) {
        return item.id;
    }
    registerChangeInPvReunions() {
        this.eventSubscriber = this.eventManager.subscribe('pvReunionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
