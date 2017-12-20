import { ProjectTypeDto } from "./project-type.dto";

export class TechnologyProjectDto {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    projectType: ProjectTypeDto;
}