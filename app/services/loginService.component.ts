/**
 * Created by nadya on 11/05/2016.
 */
import {Injectable} from 'angular2/core';
import {Http,Response}  from 'angular2/http';
import 'rxjs/Rx';
import {IngelogdeGebruiker} from "../models/IngelogdeGebruiker";
import {Headers} from "angular2/http";


@Injectable()
export class LoginService {

    token:string;
    constructor(private http:Http) {
        this.token = localStorage.getItem('token');

    }

    private _url = 'http://begroting-webapi.azurewebsites.net/api/Account/Register';
    //private _url = 'http://localhost:52597/api/Account/Register';
    private _url2 = 'http://begroting-webapi.azurewebsites.net/token';
    //private _url2 = 'http://localhost:52597/token';

    //@TODO test nog te verwijderen
    // private _url = 'http://ngauthenticationapi.azurewebsites.net/token';

    login(email: string, password: string) {

        return this.http.post(this._url2, "grant_type=password&username=" + email + "&password=" + password, {
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .map((res:any) => {
                let data = res.text;
                this.token = data.access_token;
                localStorage.setItem('token', this.token);
            });
    }


    register(gebruiker: IngelogdeGebruiker) {
        var header = new Headers();
        header.append("Content-Type","application/json");
        return this.http.post(this._url, JSON.stringify(gebruiker),{headers:header}).map(res=> res.json());
    }
}