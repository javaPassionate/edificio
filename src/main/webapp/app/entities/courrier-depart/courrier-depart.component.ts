import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { CourrierDepart } from './courrier-depart.model';
import { CourrierDepartService } from './courrier-depart.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-courrier-depart',
    templateUrl: './courrier-depart.component.html'
})
export class CourrierDepartComponent implements OnInit, OnDestroy {
courrierDeparts: CourrierDepart[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private courrierDepartService: CourrierDepartService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.courrierDepartService.query().subscribe(
            (res: ResponseWrapper) => {
                this.courrierDeparts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCourrierDeparts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CourrierDepart) {
        return item.id;
    }
    registerChangeInCourrierDeparts() {
        this.eventSubscriber = this.eventManager.subscribe('courrierDepartListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
