/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MrsPiloteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PiecejointeDetailComponent } from '../../../../../../main/webapp/app/entities/piecejointe/piecejointe-detail.component';
import { PiecejointeService } from '../../../../../../main/webapp/app/entities/piecejointe/piecejointe.service';
import { Piecejointe } from '../../../../../../main/webapp/app/entities/piecejointe/piecejointe.model';

describe('Component Tests', () => {

    describe('Piecejointe Management Detail Component', () => {
        let comp: PiecejointeDetailComponent;
        let fixture: ComponentFixture<PiecejointeDetailComponent>;
        let service: PiecejointeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MrsPiloteTestModule],
                declarations: [PiecejointeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PiecejointeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PiecejointeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PiecejointeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PiecejointeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Piecejointe(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.piecejointe).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
