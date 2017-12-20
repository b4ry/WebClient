import { TechnologyTypeEnum } from "../enums/technology-type.enum";
import { TechnologyProjectDto } from "./technology-project.dto";


export class TechnologyDto {
    name: string;
    projects: TechnologyProjectDto[];
    technologyType: TechnologyTypeEnum;
}