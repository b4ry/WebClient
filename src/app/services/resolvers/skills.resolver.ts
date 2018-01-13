import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TechnologyService } from '../skills/technology.service';

@Injectable()
export class SkillsResolver implements Resolve<any> {

    constructor(private technologyService: TechnologyService) {}

    resolve() {
        return this.technologyService.getTechnologies();
    }
}