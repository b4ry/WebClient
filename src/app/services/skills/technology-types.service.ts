import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TechnologyType } from '../dtos/technology-type';
import "rxjs/Rx";

import { environment } from '../../../environments/environment';
import { TechnologyTypeEnum } from "../enums/technology-type-enum";

@Injectable()
export class TechnologyTypeService {

    constructor(private http: Http) { 

    }

    getTechnologyTypes(): Observable<TechnologyType[]> {
        return this.http.get(environment.apiBaseUrl + 'technologytype/gettechnologytypes')
            .map((response: Response) => {
                return <TechnologyType[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}