import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';
import { ExperienceDto } from "../dtos/experience.dto";

@Injectable()
export class ExperienceService {

    private connectionString: string = 'experience/getexperiences';

    constructor(private http: HttpClient) { 

    }

    getExperiences(): Observable<ExperienceDto[]> {
        return this.http.get<ExperienceDto[]>(environment.apiBaseUrl + this.connectionString)
            .catch(this.handleError);
    }

    getExperienceByKey(companyName: string, position: string): Observable<ExperienceDto> {
        let queryParams = new HttpParams();

        queryParams = queryParams.append('companyName', companyName);
        queryParams = queryParams.append('position', position);

        return this.http.get(environment.apiBaseUrl + 'experience/getExperience', { params: queryParams })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}