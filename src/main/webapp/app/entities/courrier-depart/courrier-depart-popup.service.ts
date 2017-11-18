import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CourrierDepart } from './courrier-depart.model';
import { CourrierDepartService } from './courrier-depart.service';

@Injectable()
export class CourrierDepartPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private courrierDepartService: CourrierDepartService

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
                this.courrierDepartService.find(id).subscribe((courrierDepart) => {
                    if (courrierDepart.dateEnvoi) {
                        courrierDepart.dateEnvoi = {
                            year: courrierDepart.dateEnvoi.getFullYear(),
                            month: courrierDepart.dateEnvoi.getMonth() + 1,
                            day: courrierDepart.dateEnvoi.getDate()
                        };
                    }
                    this.ngbModalRef = this.courrierDepartModalRef(component, courrierDepart);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.courrierDepartModalRef(component, new CourrierDepart());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    courrierDepartModalRef(component: Component, courrierDepart: CourrierDepart): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.courrierDepart = courrierDepart;
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
