import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Piecejointe } from './piecejointe.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PiecejointeService {

    private resourceUrl = SERVER_API_URL + 'api/piecejointes';

    constructor(private http: Http) { }

    create(piecejointe: Piecejointe): Observable<Piecejointe> {
        const copy = this.convert(piecejointe);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(piecejointe: Piecejointe): Observable<Piecejointe> {
        const copy = this.convert(piecejointe);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Piecejointe> {
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
     * Convert a returned JSON object to Piecejointe.
     */
    private convertItemFromServer(json: any): Piecejointe {
        const entity: Piecejointe = Object.assign(new Piecejointe(), json);
        return entity;
    }

    /**
     * Convert a Piecejointe to a JSON which can be sent to the server.
     */
    private convert(piecejointe: Piecejointe): Piecejointe {
        const copy: Piecejointe = Object.assign({}, piecejointe);
        return copy;
    }
}
