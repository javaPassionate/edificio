import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PvReunion } from './pv-reunion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PvReunionService {

    private resourceUrl = SERVER_API_URL + 'api/pv-reunions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pvReunion: PvReunion): Observable<PvReunion> {
        const copy = this.convert(pvReunion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pvReunion: PvReunion): Observable<PvReunion> {
        const copy = this.convert(pvReunion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PvReunion> {
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
     * Convert a returned JSON object to PvReunion.
     */
    private convertItemFromServer(json: any): PvReunion {
        const entity: PvReunion = Object.assign(new PvReunion(), json);
        entity.datePv = this.dateUtils
            .convertLocalDateFromServer(json.datePv);
        return entity;
    }

    /**
     * Convert a PvReunion to a JSON which can be sent to the server.
     */
    private convert(pvReunion: PvReunion): PvReunion {
        const copy: PvReunion = Object.assign({}, pvReunion);
        copy.datePv = this.dateUtils
            .convertLocalDateToServer(pvReunion.datePv);
        return copy;
    }
}
