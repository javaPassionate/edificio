import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PvReunion } from './pv-reunion.model';
import { PvReunionService } from './pv-reunion.service';

@Component({
    selector: 'jhi-pv-reunion-detail',
    templateUrl: './pv-reunion-detail.component.html'
})
export class PvReunionDetailComponent implements OnInit, OnDestroy {

    pvReunion: PvReunion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pvReunionService: PvReunionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPvReunions();
    }

    load(id) {
        this.pvReunionService.find(id).subscribe((pvReunion) => {
            this.pvReunion = pvReunion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPvReunions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pvReunionListModification',
            (response) => this.load(this.pvReunion.id)
        );
    }
}
