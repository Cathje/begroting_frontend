import {Injectable} from 'angular2/core';
import {TOWNS} from './../mockData/mock-towns';

@Injectable()
export class TownService {
    getTowns() {
        return TOWNS;
    }
}