import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Plan } from './plan.model';
import { PlanService } from './plan.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-plan',
    templateUrl: './plan.component.html'
})
export class PlanComponent implements OnInit, OnDestroy {
plans: Plan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private planService: PlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.planService.query().subscribe(
            (res: ResponseWrapper) => {
                this.plans = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Plan) {
        return item.id;
    }
    registerChangeInPlans() {
        this.eventSubscriber = this.eventManager.subscribe('planListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
