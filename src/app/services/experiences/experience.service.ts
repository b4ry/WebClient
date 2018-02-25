import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { environment } from "../../../environments/environment";
import { ExperienceDto } from "../dtos/experience.dto";
import { UrlService } from "../url.service";

@Injectable()
export class ExperienceService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { }

    public getExperiences(): Observable<Array<ExperienceDto>> {
        return this.http.get<Array<ExperienceDto>>(environment.apiBaseUrl + this.urlService.getUrl("GetExperiences"))
            .catch(this.handleError);
    }

    public getExperienceByKey(companyName: string, position: string): Observable<ExperienceDto> {
        let queryParams = new HttpParams();

        queryParams = queryParams.append("companyName", companyName);
        queryParams = queryParams.append("position", position);

        return this.http.get(environment.apiBaseUrl + this.urlService.getUrl("GetExperience"), { params: queryParams })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}