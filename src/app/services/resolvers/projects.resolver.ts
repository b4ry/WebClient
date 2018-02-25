import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { ProjectService } from "../projects/project.service";
import { ProjectDto } from "../dtos/project.dto";

@Injectable()
export class ProjectsResolver implements Resolve<any> {

    constructor(private projectService: ProjectService) {}

    public resolve(): Observable<Array<ProjectDto>> {
        return this.projectService.getProjects();
    }
}