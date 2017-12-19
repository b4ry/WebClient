import { TechnologyTypeEnum } from "../enums/technology-type-enum";
import { ProjectDto } from "./project-dto";


export class TechnologyDto {
    name: string;
    projects: ProjectDto[];
    technologyType: TechnologyTypeEnum;
}