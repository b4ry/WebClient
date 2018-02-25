import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { TechnologyDto } from "../../services/dtos/technology.dto";
import { TechnologyService } from "../../services/skills/technology.service";

@Component({
  selector: "app-skills-panel",
  templateUrl: "./skills-panel.component.html",
  styleUrls: ["./skills-panel.component.css"]
})
export class SkillsPanelComponent implements OnInit, OnDestroy {

  @Input() public skillsPanelWidth: Number;
  @Input() public buttonVisibility: string;

  @Output() public notifyClosingSkillsPanel: EventEmitter<Number> = new EventEmitter<Number>();

  public technologiesDto: Array<TechnologyDto> = [];

  private aliveTechnologySubscription: boolean;

  constructor(
    private router: Router,
    private technologyService: TechnologyService
  ) { }

  public ngOnInit(): void {
    this.aliveTechnologySubscription = true;
    this.getTechnologies();
  }

  public ngOnDestroy(): void {
    this.aliveTechnologySubscription = false;
  }

  public getTechnologies(): void {
    this.technologyService.getTechnologies()
      .takeWhile(() => this.aliveTechnologySubscription)
      .subscribe(
        resultArray => this.technologiesDto = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    );
  }

  public closeSkillsPanel(): void {
    this.skillsPanelWidth = 2;
    this.notifyClosingSkillsPanel.emit(this.skillsPanelWidth);
  }

  public navigateToSkillsPage(): void {
    this.router.navigate(["/skills"]);
  }

  public navigateToSkillDetailsPage(skill: TechnologyDto): void {
    this.router.navigate(["/skills"], { queryParams: { technologyName: skill.name, technologyTypeName: skill.technologyType.name }});
  }
}
