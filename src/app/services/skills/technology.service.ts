import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { environment } from '../../../environments/environment';
import { TechnologyDto } from "../dtos/technology-dto";

@Injectable()
export class TechnologyService {

    constructor(private http: Http) { 

    }

    getTechnologies(): Observable<TechnologyDto[]> {
        return this.http.get(environment.apiBaseUrl + 'technology/gettechnologies')
            .map((response: Response) => {
                return <TechnologyDto[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}