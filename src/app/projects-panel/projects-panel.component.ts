import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectService } from "../services/projects/project.service";
import { ProjectDto } from "../services/dtos/project.dto";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "app-projects-panel",
  templateUrl: "./projects-panel.component.html",
  styleUrls: ["./projects-panel.component.css"]
})
export class ProjectsPanelComponent implements OnInit, OnDestroy {

  @Input() public projectsPanelWidth: Number;
  @Input() public buttonVisibility: string;

  @Output() public notifyClosingProjectsPanel: EventEmitter<Number> = new EventEmitter<Number>();

  private projectsDto: Array<ProjectDto> = [];
  private aliveProjectSubscription: boolean;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  public ngOnInit(): void {
    this.aliveProjectSubscription = true;
    this.getProjects();
  }

  public ngOnDestroy(): void {
    this.aliveProjectSubscription = false;
  }

  public getProjects(): void {
    this.projectService.getProjects()
    .takeWhile(() => this.aliveProjectSubscription)
    .subscribe(
        resultArray => this.projectsDto = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    );
  }

  public closeProjectsPanel(): void {
    this.projectsPanelWidth = 2;
    this.notifyClosingProjectsPanel.emit(this.projectsPanelWidth);
  }

  public navigateToProjectsPage(): void {
    this.router.navigate(["/projects"]);
  }

  public navigateToProjectDetailsPage(projectDtoName: string): void {
    this.router.navigate(["/projects", projectDtoName]);
  }
}
