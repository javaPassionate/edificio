import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CourrierArrive } from './courrier-arrive.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CourrierArriveService {

    private resourceUrl = SERVER_API_URL + 'api/courrier-arrives';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(courrierArrive: CourrierArrive): Observable<CourrierArrive> {
        const copy = this.convert(courrierArrive);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(courrierArrive: CourrierArrive): Observable<CourrierArrive> {
        const copy = this.convert(courrierArrive);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CourrierArrive> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CourrierArrive.
     */
    private convertItemFromServer(json: any): CourrierArrive {
        const entity: CourrierArrive = Object.assign(new CourrierArrive(), json);
        entity.dateReception = this.dateUtils
            .convertLocalDateFromServer(json.dateReception);
        return entity;
    }

    /**
     * Convert a CourrierArrive to a JSON which can be sent to the server.
     */
    private convert(courrierArrive: CourrierArrive): CourrierArrive {
        const copy: CourrierArrive = Object.assign({}, courrierArrive);
        copy.dateReception = this.dateUtils
            .convertLocalDateToServer(courrierArrive.dateReception);
        return copy;
    }
}
