import {Injectable} from 'angular2/core';
import {PROJECTS} from './../mockData/mock-projects.js';

@Injectable()
export class ProjectService {
    getProjects() {
        return PROJECTS;
    }

    getProject(number: string){
        return PROJECTS[number];
    }
}