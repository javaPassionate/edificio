/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MrsPiloteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CourrierArriveDetailComponent } from '../../../../../../main/webapp/app/entities/courrier-arrive/courrier-arrive-detail.component';
import { CourrierArriveService } from '../../../../../../main/webapp/app/entities/courrier-arrive/courrier-arrive.service';
import { CourrierArrive } from '../../../../../../main/webapp/app/entities/courrier-arrive/courrier-arrive.model';

describe('Component Tests', () => {

    describe('CourrierArrive Management Detail Component', () => {
        let comp: CourrierArriveDetailComponent;
        let fixture: ComponentFixture<CourrierArriveDetailComponent>;
        let service: CourrierArriveService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MrsPiloteTestModule],
                declarations: [CourrierArriveDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CourrierArriveService,
                    JhiEventManager
                ]
            }).overrideTemplate(CourrierArriveDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourrierArriveDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourrierArriveService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CourrierArrive(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.courrierArrive).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
