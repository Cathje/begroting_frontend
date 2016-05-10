/**
 * Created by nadya on 30/04/2016.
 */

import {Injectable} from 'angular2/core';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';

@Injectable()
export class BegrotingService {

    constructor(private http: Http ) {


    }
    private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';

    getFinancieleLijnen(jaar:number,naam:string):Observable<GemeenteCategorie[]> {
        return this.http.get(this._url + "?jaar=" + jaar + "&naam=" + naam)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
}
