import {Injectable} from 'angular2/core';
import {Http, Response, Headers}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {MainTown} from "../models/mainTown";
import {TOWNS} from "../mockData/mock-towns";
import {CATS} from "../mockData/mock-catDTO";


@Injectable()
export class TownService {

    constructor(private http: Http ) {


    }
   private _url = 'http://begroting-webapi.azurewebsites.net/api/Gemeente';
   //private _url = 'http://localhost:52597/api/Gemeente';

    getTowns():Observable<MainTown[]> {
        return this.http.get(this._url)
            .map(this.extractData);
    }

    //ophalen van 1 hoofdGemeente
    getTown(naam: string):Observable<MainTown> {
        return this.http.get(this._url + "?naam=" + naam)
            .map(this.extractData);
    }

    public putTown(maintown: MainTown)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._url,JSON.stringify(maintown)
            ,{headers:headers}).map(this.extractData);

    }

    public putTownInput(maintown: MainTown)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._url,JSON.stringify(maintown)
            ,{headers:headers}).map(this.extractData);

    }

    public deleteBestuurslid(id:number)
    {
        return this.http.delete(this._url + "?id=" + id)
            .map(this.extractData);
    }

    public deleteFAQ(id:number)
    {
        return this.http.delete(this._url + "/deleteFAQ/" + id)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        return res.json();
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