import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CourrierDepart } from './courrier-depart.model';
import { CourrierDepartService } from './courrier-depart.service';

@Component({
    selector: 'jhi-courrier-depart-detail',
    templateUrl: './courrier-depart-detail.component.html'
})
export class CourrierDepartDetailComponent implements OnInit, OnDestroy {

    courrierDepart: CourrierDepart;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private courrierDepartService: CourrierDepartService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCourrierDeparts();
    }

    load(id) {
        this.courrierDepartService.find(id).subscribe((courrierDepart) => {
            this.courrierDepart = courrierDepart;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCourrierDeparts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'courrierDepartListModification',
            (response) => this.load(this.courrierDepart.id)
        );
    }
}
