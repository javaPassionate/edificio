import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PvReunion } from './pv-reunion.model';
import { PvReunionService } from './pv-reunion.service';

@Injectable()
export class PvReunionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pvReunionService: PvReunionService

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
                this.pvReunionService.find(id).subscribe((pvReunion) => {
                    if (pvReunion.datePv) {
                        pvReunion.datePv = {
                            year: pvReunion.datePv.getFullYear(),
                            month: pvReunion.datePv.getMonth() + 1,
                            day: pvReunion.datePv.getDate()
                        };
                    }
                    this.ngbModalRef = this.pvReunionModalRef(component, pvReunion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pvReunionModalRef(component, new PvReunion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pvReunionModalRef(component: Component, pvReunion: PvReunion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pvReunion = pvReunion;
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
