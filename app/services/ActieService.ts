/**
 * Created by nadya on 30/04/2016.
 */
import {Injectable} from 'angular2/core';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {Actie} from "../models/actie";


@Injectable()
export class ActieService {

    constructor(private http: Http ) {


    }
    private _url = 'http://localhost:52597/api/Actie';


    getActies(catCode:string, gemeenteId:number): Observable<Actie[]>
    {
        return this.http.get(this._url + "?catCode=" + catCode + "&gemeenteId=" + gemeenteId)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
}