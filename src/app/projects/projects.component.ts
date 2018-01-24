import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectDto } from '../services/dtos/project.dto';
import { MatGridTile } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public gridTiles: GridTile[] = [];

  private aliveProjectSubscription: boolean = true;
  private projectsDto: ProjectDto[];

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.activatedRoute.data.takeWhile(() => this.aliveProjectSubscription)
    .subscribe(result => 
      {
        this.projectsDto = result['projects'];

        this.projectsDto.forEach(projectDto => {
          this.gridTiles.push(
            {
              text: projectDto.name,
              cols: 2,
              rows: 1,
              color: "transparent"
            }
          );
        });
      });
  }

  public navigateToProjectDetails(projectName: string) {
    this.router.navigate(['/projects', projectName ]);
  }
}

export interface GridTile {
  text: string;
  cols: Number;
  rows: Number;
  color: string;
}
