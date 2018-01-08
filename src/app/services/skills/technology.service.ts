import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';
import { TechnologyDto } from "../dtos/technology.dto";
import { UrlService } from "../url.service";

@Injectable()
export class TechnologyService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService) { 

    }

    getTechnologies(): Observable<TechnologyDto[]> {
        return this.http.get<TechnologyDto[]>(environment.apiBaseUrl + this.urlService.getUrl("GetTechnologies"))
            .catch(this.handleError);
    }

    createTechnology(technology: TechnologyDto): Observable<TechnologyDto[]> {
        return this.http.post(environment.apiBaseUrl + this.urlService.getUrl("CreateTechnology"), technology)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}