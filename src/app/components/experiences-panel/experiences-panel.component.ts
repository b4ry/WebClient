import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { ExperienceDto } from "../../services/dtos/experience.dto";
import { ExperienceService } from "../../services/experiences/experience.service";

@Component({
  selector: "app-experiences-panel",
  templateUrl: "./experiences-panel.component.html",
  styleUrls: ["./experiences-panel.component.css"]
})
export class ExperiencesPanelComponent implements OnInit, OnDestroy {

  @Input() public experiencesPanelHeight: Number;
  @Input() public buttonVisibility: string;

  @Output() public notifyClosingExperiencesPanel: EventEmitter<Number> = new EventEmitter<Number>();

  private experiencesDto: Array<ExperienceDto> = [];
  private aliveExperienceSubscription: boolean;

  constructor(
    private router: Router,
    private experienceService: ExperienceService
  ) { }

  public ngOnInit(): void {
    this.aliveExperienceSubscription = true;
    this.getExperiences();
  }

  public ngOnDestroy(): void {
    this.aliveExperienceSubscription = false;
  }

  public getExperiences(): void {
    this.experienceService.getExperiences()
    .takeWhile(() => this.aliveExperienceSubscription)
    .subscribe(
        resultArray => this.experiencesDto = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    );
  }

  public closeExperiencesPanel(): void {
    this.experiencesPanelHeight = 4;
    this.notifyClosingExperiencesPanel.emit(this.experiencesPanelHeight);
  }

  public navigateToExperiencesPage(): void {
    this.router.navigate(["/experiences"]);
  }

  public navigateToExperience(companyName: string, position: string): void {
    this.router.navigate(["experience", companyName, position]);
  }
}
