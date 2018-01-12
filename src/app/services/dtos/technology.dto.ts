import { TechnologyProjectDto } from "./technology-project.dto";
import { TechnologyTypeDto } from "./technology-type.dto";

export class TechnologyDto {
    name: string;
    projects: TechnologyProjectDto[];
    technologyType: TechnologyTypeDto;
    iconClass: string;
}