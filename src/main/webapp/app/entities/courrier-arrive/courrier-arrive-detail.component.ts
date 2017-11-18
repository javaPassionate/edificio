import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CourrierArrive } from './courrier-arrive.model';
import { CourrierArriveService } from './courrier-arrive.service';

@Component({
    selector: 'jhi-courrier-arrive-detail',
    templateUrl: './courrier-arrive-detail.component.html'
})
export class CourrierArriveDetailComponent implements OnInit, OnDestroy {

    courrierArrive: CourrierArrive;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private courrierArriveService: CourrierArriveService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCourrierArrives();
    }

    load(id) {
        this.courrierArriveService.find(id).subscribe((courrierArrive) => {
            this.courrierArrive = courrierArrive;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCourrierArrives() {
        this.eventSubscriber = this.eventManager.subscribe(
            'courrierArriveListModification',
            (response) => this.load(this.courrierArrive.id)
        );
    }
}
