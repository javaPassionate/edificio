/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MrsPiloteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PlanDetailComponent } from '../../../../../../main/webapp/app/entities/plan/plan-detail.component';
import { PlanService } from '../../../../../../main/webapp/app/entities/plan/plan.service';
import { Plan } from '../../../../../../main/webapp/app/entities/plan/plan.model';

describe('Component Tests', () => {

    describe('Plan Management Detail Component', () => {
        let comp: PlanDetailComponent;
        let fixture: ComponentFixture<PlanDetailComponent>;
        let service: PlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MrsPiloteTestModule],
                declarations: [PlanDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PlanService,
                    JhiEventManager
                ]
            }).overrideTemplate(PlanDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlanDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Plan(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.plan).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
