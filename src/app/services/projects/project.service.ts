import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { ProjectDto } from "../dtos/project.dto";


@Injectable()
export class ProjectService {

    private connectionString: string = 'project/getprojects';
    
    constructor(private http: HttpClient) { 

    }

    getProjects(): Observable<ProjectDto[]> {
        return this.http.get(environment.apiBaseUrl + this.connectionString)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}