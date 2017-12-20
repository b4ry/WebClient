import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/projects/project.service';
import { ProjectDto } from '../services/dtos/project.dto';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-projects-panel',
  templateUrl: './projects-panel.component.html',
  styleUrls: ['./projects-panel.component.css']
})
export class ProjectsPanelComponent implements OnInit, OnDestroy {

  @Input() projectsPanelWidth: Number;
  @Output() notifyClosingProjectsPanel: EventEmitter<Number> = new EventEmitter<Number>();

  private projects: ProjectDto[] = [];
  private aliveProjectSubscription: boolean = true;

  constructor(
    private router: Router, 
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.aliveProjectSubscription = false;
  }

  getProjects(): void {
    this.projectService.getProjects()
    .takeWhile(() => this.aliveProjectSubscription)
    .subscribe(
        resultArray => this.projects = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    )
  }

  closeProjectsPanel(): void {
    this.projectsPanelWidth = 0;
    this.notifyClosingProjectsPanel.emit(this.projectsPanelWidth);
  }

  redirectToProjectsPage() {
    this.router.navigate(['/projects']);
  }
}
