import { ProjectTypeDto } from "./project-type.dto";
import { ProjectTechnologyDto } from "./project-technology.dto";

export class ProjectDto {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    technologies: ProjectTechnologyDto;
    projectType: ProjectTypeDto;
}