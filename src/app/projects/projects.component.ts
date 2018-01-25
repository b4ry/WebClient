import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectDto } from '../services/dtos/project.dto';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'startTime', 'endTime', 'details'];
  public dataSource: MatTableDataSource<ProjectDto>;

  private aliveProjectSubscription: boolean = true;
  private projectsDto: ProjectDto[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
        this.dataSource = new MatTableDataSource<ProjectDto>(this.projectsDto);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public navigateToProjectDetails(projectDto: ProjectDto) {
    this.router.navigate(['/projects', projectDto.name ]);
  }
}