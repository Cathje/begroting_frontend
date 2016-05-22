/**
 * Created by nadya on 11/05/2016.
 */
import {Injectable} from 'angular2/core';
import {Http,Response,Headers}  from 'angular2/http';
import 'rxjs/Rx';
import {IngelogdeGebruiker} from "../models/IngelogdeGebruiker";
import {Headers} from "angular2/http";
import {InTeLoggenGebruiker} from "../models/InTeLoggenGebruiker";
import {Token} from "../models/Token";
import {Observable} from "rxjs/Observable";



@Injectable()
export class LoginService {


    resp:string;
    token:any;
    constructor(private http:Http) {

    }

  //  private _url = 'http://begroting-webapi.azurewebsites.net/api/Account';
    private _url = 'http://localhost:52597/api/Account';
    //private _url2 = 'http://begroting-webapi.azurewebsites.net/token';
    private _url2 = 'http://localhost:52597/token';

    login(email: string, password: string) {

        return this.http.post(this._url2, "grant_type=password&username=" + email + "&password=" + password, {
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .map(this.extractData);

    }


    register(gebruiker: InTeLoggenGebruiker) {
        var header = new Headers();
        header.append("Content-Type","application/json");
        return this.http.post(this._url + "/Register", JSON.stringify(gebruiker),{headers:header}).map(this.extractData);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        
        let data = res.text();
        return data;
    }
    private extractDataAsJson(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }

        let data = res.json();
        return data;
    }


    getGebruikers(gemeente : string):Observable<IngelogdeGebruiker[]> {
        return this.http.get(this._url + "/GetGebruikers?gemeente=" + gemeente)
            .map(this.extractDataAsJson);
    }

    putGebruikers(gebruikers : IngelogdeGebruiker []) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._url,JSON.stringify(gebruikers)
            ,{headers:headers}).map(this.extractDataAsJson);
    }


}