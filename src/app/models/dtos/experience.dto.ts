import { ProjectDto } from "./project.dto";

export class ExperienceDto {
    public companyName: string;
    public position: string;
    public projects: Array<ProjectDto>;
}