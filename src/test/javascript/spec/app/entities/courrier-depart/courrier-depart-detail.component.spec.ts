/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MrsPiloteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CourrierDepartDetailComponent } from '../../../../../../main/webapp/app/entities/courrier-depart/courrier-depart-detail.component';
import { CourrierDepartService } from '../../../../../../main/webapp/app/entities/courrier-depart/courrier-depart.service';
import { CourrierDepart } from '../../../../../../main/webapp/app/entities/courrier-depart/courrier-depart.model';

describe('Component Tests', () => {

    describe('CourrierDepart Management Detail Component', () => {
        let comp: CourrierDepartDetailComponent;
        let fixture: ComponentFixture<CourrierDepartDetailComponent>;
        let service: CourrierDepartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MrsPiloteTestModule],
                declarations: [CourrierDepartDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CourrierDepartService,
                    JhiEventManager
                ]
            }).overrideTemplate(CourrierDepartDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourrierDepartDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourrierDepartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CourrierDepart(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.courrierDepart).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
