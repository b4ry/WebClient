import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TechnologyTypeService } from '../skills/technology-type.service';

@Injectable()
export class TechnologyTypesResolver implements Resolve<any> {

    constructor(private technologyTypeService: TechnologyTypeService) {}

    resolve() {
        return this.technologyTypeService.getTechnologyTypes();
    }
}