import { ProjectTypeDto } from "./project-type.dto";
import { ProjectDto } from "./project.dto";

export class ExperienceDto {
    companyName: string;
    position: string;
    projects: ProjectDto[];
}