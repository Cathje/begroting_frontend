import {Injectable} from 'angular2/core';
import {Http, Response, Headers}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {PROJECTS} from "../mockData/mock-projects.js";
import {Project} from "../models/project.js";
import {GemeenteCategorie} from "../models/gemeenteCategorie.js";
import {InspraakCategorie} from "../models/dto/inspraakCategorieDTO";



@Injectable()
export class ProjectService
{

    constructor(private http: Http ) {
    }
    //private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
    //private _url2 = 'http://begroting-webapi.azurewebsites.net/api/Project';
    private _url = 'http://localhost:52597/api/Begroting';
    private _url2 = 'http://localhost:52597/api/Project';

    getInspraakitems(jaar:number, naam:string):Observable<GemeenteCategorie[]> {
        return this.http.get(this._url2 + "?jaar=" + jaar + "&naam=" + naam)
            .map(res => res.json());
    }

    putProject(p: Project)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._url2,JSON.stringify({projectScenario:p.projectScenario, vraag:p.vraag,
                titel:p.titel, extraInfo:p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag:p.maxBedrag, cats: p.categorieen, boekjaar: p.boekjaar, gemeente: p.gemeente})
            ,{headers:headers}).map((res:Response) => res.json());

    }


    getProjects() {
         return PROJECTS;
    }

    getProject(number: number){
         return PROJECTS[number];
    }
}