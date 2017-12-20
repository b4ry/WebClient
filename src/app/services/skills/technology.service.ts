import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { TechnologyDto } from "../dtos/technology.dto";

@Injectable()
export class TechnologyService {

    private connectionString: string = 'technology/gettechnologies';

    constructor(private http: HttpClient) { 

    }

    getTechnologies(): Observable<TechnologyDto[]> {
        return this.http.get(environment.apiBaseUrl + this.connectionString)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}