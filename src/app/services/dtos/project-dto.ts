import { ProjectTypeDto } from "./project-type-dto";

export class ProjectDto {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    projectType: ProjectTypeDto;
}