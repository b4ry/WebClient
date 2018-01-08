import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';
import { ProjectDto } from "../dtos/project.dto";
import { UrlService } from "../url.service";


@Injectable()
export class ProjectService {
    
    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { 

    }

    getProjects(): Observable<ProjectDto[]> {
        return this.http.get<ProjectDto[]>(environment.apiBaseUrl + this.urlService.getUrl("GetProjects"))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}