import {Injectable} from 'angular2/core';
import {TOWNS} from './../mockData/mock-towns';
import {Http,Response}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import {MainTown} from "../models/mainTown";
import 'rxjs/Rx';
import {CATS} from './../mockData/mock-catDTO';


@Injectable()
export class TownService {

    constructor(private http: Http ) {


    }
    private _url = 'http://begroting-webapi.azurewebsites.net/Gemeente';

    getTowns():Observable<MainTown[]> {
        return this.http.get(this._url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //ophalen van 1 hoofdGemeente
    getTown(naam: string):Observable<MainTown> {
        return this.http.get(this._url + "?naam=" + naam)
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

    getTownHC(name: string) : MainTown{
        for (var i = 0; i < TOWNS.length; i++) {
            if(TOWNS[i].naam == name) {
                return TOWNS[i];
            }
        }
        
    }
    
    getCatDataHC(){
        return CATS;
        
    }
    
     
}