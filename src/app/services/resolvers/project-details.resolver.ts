import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProjectService } from '../projects/project.service';

@Injectable()
export class ProjectDetailsResolver implements Resolve<any> {

    private projectName: string;

    constructor(
        private projectService: ProjectService
    ) {}

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        this.projectName = activatedRouteSnapshot.params['projectName'];

        return this.projectService.getProject(this.projectName);
    }
}