import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { environment } from "../../../environments/environment";
import { TechnologyTypeEnum } from "../enums/technology-type.enum";
import { TechnologyTypeDto } from "../dtos/technology-type.dto";
import { UrlService } from "../url.service";

@Injectable()
export class TechnologyTypeService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService) { }

    public getTechnologyTypes(): Observable<Array<TechnologyTypeDto>> {
        return this.http.get<Array<TechnologyTypeDto>>(environment.apiBaseUrl + this.urlService.getUrl("GetTechnologyTypes"))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}