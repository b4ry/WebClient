import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { environment } from "../../../environments/environment";
import { ProjectDto } from "../../models/dtos/project.dto";
import { UrlService } from "../url.service";


@Injectable()
export class ProjectService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { }

    public getProjects(): Observable<Array<ProjectDto>> {
        return this.http.get<Array<ProjectDto>>(environment.apiBaseUrl + this.urlService.getUrl("GetProjects"))
            .catch(this.handleError);
    }

    public getProject(projectName: string): Observable<ProjectDto> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("projectName", projectName);

        return this.http.get(environment.apiBaseUrl + this.urlService.getUrl("GetProject"), { params: queryParams })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}