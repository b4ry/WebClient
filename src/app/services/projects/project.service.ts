import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { environment } from '../../../environments/environment';
import { ProjectDto } from "../dtos/project.dto";

@Injectable()
export class ProjectService {

    private connectionString: string = 'project/getprojects';
    
    constructor(private http: Http) { 

    }

    getProjects(): Observable<ProjectDto[]> {
        return this.http.get(environment.apiBaseUrl + this.connectionString)
            .map((response: Response) => {
                return <ProjectDto[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}