import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { TechnologyTypeEnum } from "../enums/technology-type.enum";
import { TechnologyTypeDto } from '../dtos/technology-type.dto';

@Injectable()
export class TechnologyTypeService {

    private connectionString: string = 'technologytype/gettechnologytypes';

    constructor(private http: HttpClient) { 

    }

    getTechnologyTypes(): Observable<TechnologyTypeDto[]> {
        return this.http.get<TechnologyTypeDto[]>(environment.apiBaseUrl + this.connectionString)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}