import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { TechnologyDto } from '../services/dtos/technology.dto';
import { TechnologyService } from '../services/skills/technology.service';

@Component({
  selector: 'app-skills-panel',
  templateUrl: './skills-panel.component.html',
  styleUrls: ['./skills-panel.component.css']
})
export class SkillsPanelComponent implements OnInit, OnDestroy {

  @Input() skillsPanelWidth: Number;
  @Input() buttonVisibility: string;

  @Output() notifyClosingSkillsPanel: EventEmitter<Number> = new EventEmitter<Number>();
  
  public technologiesDto: TechnologyDto[] = [];

  private aliveTechnologySubscription: boolean = true;

  constructor(
    private router: Router, 
    private technologyService: TechnologyService
  ) { }

  ngOnInit() {
    this.getTechnologies();
  }

  ngOnDestroy(): void {
    this.aliveTechnologySubscription = false;
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies()
      .takeWhile(() => this.aliveTechnologySubscription)
      .subscribe(
        resultArray => this.technologiesDto = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    )
  }

  closeSkillsPanel(): void {
    this.skillsPanelWidth = 2;

    this.notifyClosingSkillsPanel.emit(this.skillsPanelWidth);
  }

  navigateToSkillsPage(): void {
    this.router.navigate(['/skills']);
  }

  navigateToSkillsPageDetails(skill: TechnologyDto): void {
    this.router.navigate(['/skills'], { queryParams: { technologyName: skill.name, technologyTypeName: skill.technologyType.name }});
  }
}
