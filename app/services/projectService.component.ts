import {Injectable} from 'angular2/core';
import {Http, Response, Headers}  from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {InspraakCategorie} from "../models/dto/inspraakCategorieDTO";
import {PROJECTS} from "../mockData/mock-projects";
import {Project} from "../models/project";

@Injectable()
export class ProjectService
{

    constructor(private http: Http ) {


    }
    //private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
    //private _url2 = 'http://begroting-webapi.azurewebsites.net/api/Project';
    private _url = 'http://localhost:52597/api/Begroting';
    private _url2 = 'http://localhost:52597/api/Project';

    getInspraakcategorieen(jaar:number, naam:string):Observable<InspraakCategorie[]> {
        return this.http.get(this._url + "?jaar=" + jaar + "&naam=" + naam)
            .map(res => res.json());
    }

    putProject(p: Project, cats: InspraakCategorie [])
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._url2,JSON.stringify({projectScenario:p.projectScenario, vraag:p.vraag,
                titel:p.titel, extraInfo:p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag:p.maxBedrag, cats: cats})
            ,{headers:headers}).map((res:Response) => res.json());

    }


    getProjects() {
         return PROJECTS;
    }

    getProject(number: number){
         return PROJECTS[number];
    }
}