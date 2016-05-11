/**
 * Created by nadya on 30/04/2016.
 */
import {Injectable} from 'angular2/core';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {Actie} from "../models/actie.js";
import {Actie} from "../models/actie";


@Injectable()
export class ActieService {

    constructor(private http: Http ) {


    }
    // private _url = 'http://begroting-webapi.azurewebsites.net/api/Actie/';
    private _url = 'http://localhost:52597/api/Actie/';


    getActies(id:number): Observable<Actie[]>
    {
        return this.http.get(this._url + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
}