import { Pipe, PipeTransform } from "@angular/core";

import { TechnologyDto } from "../dtos/technology.dto";
import { TechnologyTypeEnum } from "../enums/technology-type.enum";


@Pipe({name: "filterTechnologiesPipe"})
export class FilterTechnologiesPipe implements PipeTransform {
  public transform(technologies: Array<TechnologyDto>, technologyTypeEnum: TechnologyTypeEnum): Array<TechnologyDto> {
    const filteredTechnologies: Array<TechnologyDto> = [];

    for (const technology of technologies) {
        if (technology.technologyType.technologyTypeEnum === technologyTypeEnum) {
            filteredTechnologies.push(technology);
        }
    }

    return filteredTechnologies;
  }
}