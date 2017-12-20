import { TechnologyTypeEnum } from "../enums/technology-type.enum";
import { TechnologyProjectDto } from "./technology-project.dto";
import { TechnologyTypeDto } from "./technology-type.dto";

export class TechnologyDto {
    name: string;
    projects: TechnologyProjectDto[];
    technologyType: TechnologyTypeDto;
}