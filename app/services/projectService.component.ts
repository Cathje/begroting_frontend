import {Injectable} from 'angular2/core';
import {Http, Response, Headers}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {PROJECTS} from "../mockData/mock-projects";
import {Project} from "../models/project";
import {GemeenteCategorie} from "../models/gemeenteCategorie";
import {BegrotingsVoorstel} from "../models/begrotingsVoorstel";




@Injectable()
export class ProjectService
{

    constructor(private http: Http ) {
    }
  private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
   private _url2 = 'http://begroting-webapi.azurewebsites.net/api/Project';
   // private _url = 'http://localhost:52597/api/Begroting';
   // private _url2 = 'http://localhost:52597/api/Project';

    getInspraakitems(jaar:number, naam:string):Observable<GemeenteCategorie[]> {
        return this.http.get(this._url2 + "/itemsGET" +"?jaar=" + jaar + "&naam=" + naam)
            .map(this.extractData);
    }

    putProject(p: Project)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._url2 + "/postProject",JSON.stringify({projectScenario:p.projectScenario, vraag:p.vraag,
                titel:p.titel, extraInfo:p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag:p.maxBedrag, cats: p.cats, boekjaar: p.boekjaar, gemeente: p.gemeente,
                isActief:p.isActief, afbeeldingen:p.afbeeldingen})
            ,{headers:headers}).map(this.extractData);

    }
    
    postBegrotingsVoorstel(projectId:number, voorstel: BegrotingsVoorstel)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._url2 + "/postVoorstel/" + projectId,JSON.stringify(voorstel)
            ,{headers:headers}).map(this.extractData);
    }

    getProject(jaar:number, naam:string):Observable<Project> {
        return this.http.get(this._url2 + "/projectGET" +"?jaar=" + jaar + "&naam=" + naam)
            .map(this.extractData);
    }

    putVoorstel(voorstelId:number, status: number)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._url2 + "/putVoorstel/" + voorstelId,JSON.stringify(status)
            ,{headers:headers}).map(this.extractData);
    }
    putReactieEnStem(voorstelId:number, email:string)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._url2 + "/putReactieEnStem/" + voorstelId,JSON.stringify(email)
            ,{headers:headers}).map(this.extractData);
    }


    getProjects(naam:string):Observable<Project[]> {
        return this.http.get(this._url2 +"?naam=" + naam)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        return res.json();
    }
}