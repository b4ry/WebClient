import { ProjectTypeDto } from "./project-type.dto";

export class TechnologyProjectDto {
    public name: string;
    public description: string;
    public startTime: Date;
    public endTime: Date;
    public projectType: ProjectTypeDto;
}