import {Injectable} from 'angular2/core';
import {TOWNS} from './../mockData/mock-towns';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import {MainTown} from "../models/mainTown";
import 'rxjs/Rx';


@Injectable()
export class TownService {

    constructor(private http: Http ) {


    }
    private _url = 'http://begrotingwebapi.azurewebsites.net/api/Gemeente';

    getTowns():Observable<MainTown[]> {
        return this.http.get(this._url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //ophalen van 1 hoofdGemeente
    getTown(id: number):Observable<MainTown> {
        return this.http.get(this._url + "/" + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }


    getTownsHC() {
        return TOWNS;
    }
}