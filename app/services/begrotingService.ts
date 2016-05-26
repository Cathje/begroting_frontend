/**
 * Created by nadya on 30/04/2016.
 */

import {Injectable} from 'angular2/core';
import {Http, Response, Headers}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {GemeenteCategorie} from "../models/gemeenteCategorie";
import {Actie} from "../models/actie";
import {Begroting} from "../models/begroting";

@Injectable()
export class BegrotingService {

    constructor(private http: Http ) {


    }
 private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
  //private _url = 'http://localhost:52597/api/Begroting';

    getGemeenteCategorieen(jaar:number, naam:string):Observable<GemeenteCategorie[]> {
        return this.http.get(this._url + "?jaar=" + jaar + "&naam=" + naam)
            .map(this.extractData);
    }
    getClusters(jaar:number, naam:string):Observable<GemeenteCategorie[]> {
        return this.http.get(this._url + "/getClusterAverages" + "?jaar" + jaar + "$gemeenteNaam" + naam)
            .map(this.extractData)
    }

    getBegrotingen( naam:string):Observable<Begroting[]> {
        return this.http.get(this._url + "/getBegrotingen?naam=" + naam)
            .map(this.extractData);
    }

    getActies(id:number): Observable<Actie[]>
    {
        return this.http.get(this._url +  "?id=" + id)
            .map(this.extractData);
    }


    putCategorieInput(gemcats: GemeenteCategorie [])
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
        return this.http.put(this._url + "/changeCatInput",JSON.stringify(gemcats)
            ,{headers:headers}).map(this.extractData);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        return res.json();
    }

}
