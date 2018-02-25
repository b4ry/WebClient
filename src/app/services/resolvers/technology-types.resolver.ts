import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { TechnologyTypeService } from "../skills/technology-type.service";
import { TechnologyTypeDto } from "../dtos/technology-type.dto";

@Injectable()
export class TechnologyTypesResolver implements Resolve<any> {

    constructor(private technologyTypeService: TechnologyTypeService) {}

    public resolve(): Observable<Array<TechnologyTypeDto>> {
        return this.technologyTypeService.getTechnologyTypes();
    }
}