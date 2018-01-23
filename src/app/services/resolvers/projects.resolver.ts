import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProjectService } from '../projects/project.service';

@Injectable()
export class ProjectsResolver implements Resolve<any> {

    constructor(private projectService: ProjectService) {}

    resolve() {
        return this.projectService.getProjects();
    }
}