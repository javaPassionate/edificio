import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CourrierDepart } from './courrier-depart.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CourrierDepartService {

    private resourceUrl = SERVER_API_URL + 'api/courrier-departs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(courrierDepart: CourrierDepart): Observable<CourrierDepart> {
        const copy = this.convert(courrierDepart);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(courrierDepart: CourrierDepart): Observable<CourrierDepart> {
        const copy = this.convert(courrierDepart);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CourrierDepart> {
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
     * Convert a returned JSON object to CourrierDepart.
     */
    private convertItemFromServer(json: any): CourrierDepart {
        const entity: CourrierDepart = Object.assign(new CourrierDepart(), json);
        entity.dateEnvoi = this.dateUtils
            .convertLocalDateFromServer(json.dateEnvoi);
        return entity;
    }

    /**
     * Convert a CourrierDepart to a JSON which can be sent to the server.
     */
    private convert(courrierDepart: CourrierDepart): CourrierDepart {
        const copy: CourrierDepart = Object.assign({}, courrierDepart);
        copy.dateEnvoi = this.dateUtils
            .convertLocalDateToServer(courrierDepart.dateEnvoi);
        return copy;
    }
}
