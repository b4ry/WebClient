import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,/*, ParamMap */ Router} from '@angular/router';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";

import { ProjectDto } from '../services/dtos/project.dto';
import { ProjectService } from '../services/projects/project.service';
import { projectLabelAnimation } from './project-label-animation.animation';

@Component({
  selector: 'app-project-details',
  animations: [ projectLabelAnimation ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public projectDto: ProjectDto;

  public isFirst: boolean;
  public isLast: boolean;

  public itemState: string;

  public gridTiles = [
    {text: 'DESCRIPTION', cols: 4, rows: 1, color: 'transparent'},
    {text: 'TECHNOLOGIES', cols: 2, rows: 1, color: 'transparent'},
    {text: 'DETAILS', cols: 2, rows: 1, color: 'transparent'},
  ];

  private projectDtoIndex: Number;
  private projectsDto: ProjectDto[];

  private aliveProjectSubscription: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) 
  {
    this.location = location;
  }

  ngOnInit() {
    this.activatedRoute.data.takeWhile(() => this.aliveProjectSubscription)
      .subscribe(result => 
        {
          this.projectDto = result['projectDetails'];
        });

    this.activatedRoute.data.takeWhile(() => this.aliveProjectSubscription)
      .subscribe(result => 
        {
          this.projectsDto = result['projects'];
          this.determinePositionOfProjectDto();
        });

    // this.activatedRoute.paramMap
    //   .switchMap((params: ParamMap) => this.projectService.getProject(params.get('projectName')))
    //   .takeWhile(() => this.aliveProjectSubscription)
    //   .subscribe(
    //     result => this.projectDto = result,
    //     error => console.log("Error :: " + error)
    //   )
  }

  ngOnDestroy(): void {
    this.aliveProjectSubscription = false;
  }

  public navigateToNextProject() {
    this.itemState = "void-next";

    setTimeout(() => { 
      this.projectDto = this.projectsDto[+this.projectDtoIndex+1];
      this.determinePositionOfProjectDto();
      this.changeUrlWithoutRedirecting(this.projectDto.name);
      this.itemState = "next";
    }, 400);
  }

  public navigateToPreviousProject() {
    this.itemState = "void-previous";
    
    setTimeout(() => { 
      this.projectDto = this.projectsDto[+this.projectDtoIndex-1];
      this.determinePositionOfProjectDto();
      this.changeUrlWithoutRedirecting(this.projectDto.name);
      this.itemState = "previous";
    }, 400);
  }

  private determinePositionOfProjectDto() {
    this.projectDtoIndex = this.projectsDto.findIndex(projectDto => projectDto.name === this.projectDto.name);

    if(this.projectsDto.length > 0) {
      if(this.projectDtoIndex === 0) {
        this.isFirst = true;
        this.isLast = false;
      }
      else if(this.projectDtoIndex === this.projectsDto.length-1) {
        this.isFirst = false;
        this.isLast = true;
      }
      else {
        this.isFirst = false;
        this.isLast = false;
      }
    }
  }

  private changeUrlWithoutRedirecting(projectName: string): void {
    let url = this.router
      .createUrlTree([this.router.url.split('/')[1], projectName])
      .toString();

    this.location.go(url);  
  }
}
