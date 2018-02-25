import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

import { ProjectDto } from "../../models/dtos/project.dto";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ["name", "startTime", "endTime", "details"];
  public dataSource: MatTableDataSource<ProjectDto>;

  private aliveProjectSubscription: boolean;
  private projectsDto: Array<ProjectDto>;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.aliveProjectSubscription = true;
    this.activatedRoute.data.takeWhile(() => this.aliveProjectSubscription)
    .subscribe(result => {
        this.projectsDto = result["projects"];
        this.dataSource = new MatTableDataSource<ProjectDto>(this.projectsDto);
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public navigateToProjectDetails(projectDto: ProjectDto): void {
    this.router.navigate(["/projects", projectDto.name ]);
  }
}