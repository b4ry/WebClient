import { Pipe, PipeTransform } from '@angular/core';

import { TechnologyDto } from '../dtos/technology.dto';
import { TechnologyTypeEnum } from '../enums/technology-type.enum';


@Pipe({name: 'filterTechnologiesPipe'})
export class FilterTechnologiesPipe implements PipeTransform {
  transform(technologies: TechnologyDto[], technologyTypeEnum: TechnologyTypeEnum): TechnologyDto[] {
    let filteredTechnologies: TechnologyDto[] = [];

    for(var technology of technologies) {
        if(technology.technologyType.technologyTypeEnum === technologyTypeEnum) {
            filteredTechnologies.push(technology)
        }
    }
    
    return filteredTechnologies;
  }
}