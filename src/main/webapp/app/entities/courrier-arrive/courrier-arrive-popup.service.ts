import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CourrierArrive } from './courrier-arrive.model';
import { CourrierArriveService } from './courrier-arrive.service';

@Injectable()
export class CourrierArrivePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private courrierArriveService: CourrierArriveService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.courrierArriveService.find(id).subscribe((courrierArrive) => {
                    if (courrierArrive.dateReception) {
                        courrierArrive.dateReception = {
                            year: courrierArrive.dateReception.getFullYear(),
                            month: courrierArrive.dateReception.getMonth() + 1,
                            day: courrierArrive.dateReception.getDate()
                        };
                    }
                    this.ngbModalRef = this.courrierArriveModalRef(component, courrierArrive);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.courrierArriveModalRef(component, new CourrierArrive());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    courrierArriveModalRef(component: Component, courrierArrive: CourrierArrive): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.courrierArrive = courrierArrive;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
