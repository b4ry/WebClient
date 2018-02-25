import { ProjectTypeDto } from "./project-type.dto";
import { ProjectTechnologyDto } from "./project-technology.dto";

export class ProjectDto {
    public name: string;
    public description: string;
    public startTime: Date;
    public endTime: Date;
    public technologies: ProjectTechnologyDto;
    public projectType: ProjectTypeDto;
}