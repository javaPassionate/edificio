/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MrsPiloteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PvReunionDetailComponent } from '../../../../../../main/webapp/app/entities/pv-reunion/pv-reunion-detail.component';
import { PvReunionService } from '../../../../../../main/webapp/app/entities/pv-reunion/pv-reunion.service';
import { PvReunion } from '../../../../../../main/webapp/app/entities/pv-reunion/pv-reunion.model';

describe('Component Tests', () => {

    describe('PvReunion Management Detail Component', () => {
        let comp: PvReunionDetailComponent;
        let fixture: ComponentFixture<PvReunionDetailComponent>;
        let service: PvReunionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MrsPiloteTestModule],
                declarations: [PvReunionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PvReunionService,
                    JhiEventManager
                ]
            }).overrideTemplate(PvReunionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PvReunionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PvReunionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PvReunion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pvReunion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
