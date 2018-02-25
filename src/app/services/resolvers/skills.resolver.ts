import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { TechnologyService } from "../skills/technology.service";
import { TechnologyDto } from "../dtos/technology.dto";

@Injectable()
export class SkillsResolver implements Resolve<any> {

    constructor(private technologyService: TechnologyService) {}

    public resolve(): Observable<Array<TechnologyDto>> {
        return this.technologyService.getTechnologies();
    }
}