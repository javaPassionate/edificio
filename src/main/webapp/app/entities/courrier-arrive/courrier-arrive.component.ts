import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { CourrierArrive } from './courrier-arrive.model';
import { CourrierArriveService } from './courrier-arrive.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-courrier-arrive',
    templateUrl: './courrier-arrive.component.html'
})
export class CourrierArriveComponent implements OnInit, OnDestroy {
courrierArrives: CourrierArrive[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private courrierArriveService: CourrierArriveService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.courrierArriveService.query().subscribe(
            (res: ResponseWrapper) => {
                this.courrierArrives = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCourrierArrives();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CourrierArrive) {
        return item.id;
    }
    registerChangeInCourrierArrives() {
        this.eventSubscriber = this.eventManager.subscribe('courrierArriveListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
