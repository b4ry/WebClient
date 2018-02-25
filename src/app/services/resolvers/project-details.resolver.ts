import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { ProjectService } from "../projects/project.service";
import { Observable } from "rxjs/Observable";
import { ProjectDto } from "../../models/dtos/project.dto";

@Injectable()
export class ProjectDetailsResolver implements Resolve<any> {

    private projectName: string;

    constructor(
        private projectService: ProjectService
    ) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<ProjectDto> {
        this.projectName = activatedRouteSnapshot.params["projectName"];

        return this.projectService.getProject(this.projectName);
    }
}