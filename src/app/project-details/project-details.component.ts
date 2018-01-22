import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";

import { ProjectDto } from '../services/dtos/project.dto';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public projectDto: ProjectDto;

  private aliveProjectSubscription: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.projectService.getProject(params.get('projectName')))
      .takeWhile(() => this.aliveProjectSubscription)
      .subscribe(
        result => this.projectDto = result,
        error => console.log("Error :: " + error)
      )
  }

  ngOnDestroy(): void {
    this.aliveProjectSubscription = false;
  }


}
