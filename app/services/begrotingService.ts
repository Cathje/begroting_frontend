/**
 * Created by nadya on 30/04/2016.
 */

import {Injectable} from 'angular2/core';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {GemeenteCategorie} from "../models/gemeenteCategorie";

@Injectable()
export class BegrotingService {

    constructor(private http: Http ) {


    }
    //private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
    private _url = 'http://localhost:52597/api/Begroting';

    getGemeenteCategorieen(jaar:number, naam:string):Observable<GemeenteCategorie[]> {
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
