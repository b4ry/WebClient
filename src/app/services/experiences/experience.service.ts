import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { environment } from '../../../environments/environment';
import { ExperienceDto } from "../dtos/experience.dto";

@Injectable()
export class ExperienceService {

    private connectionString: string = 'experience/getexperiences';

    constructor(private http: Http) { 

    }

    getExperiences(): Observable<ExperienceDto[]> {
        return this.http.get(environment.apiBaseUrl + this.connectionString)
            .map((response: Response) => {
                return <ExperienceDto[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}