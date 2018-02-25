import { Component, OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { ExperienceService } from "../services/experiences/experience.service";
import { ExperienceDto } from "../services/dtos/experience.dto";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-experience-details",
  templateUrl: "./experience-details.component.html",
  styleUrls: ["./experience-details.component.css"]
})
export class ExperienceDetailsComponent implements OnInit, OnDestroy {

  private companyName: string;
  private position: string;

  private experience: ExperienceDto;
  private aliveExperienceSubscription: boolean;

  constructor(
    private experienceService: ExperienceService,
    private activedRoute: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.aliveExperienceSubscription = true;
    this.companyName = this.activedRoute.snapshot.params["companyName"];
    this.position = this.activedRoute.snapshot.params["position"];

    this.getExperienceByKey(this.companyName, this.position);
  }

  public ngOnDestroy(): void {
    this.aliveExperienceSubscription = false;
  }

  public getExperienceByKey(companyName: string, position: string): void {
    this.experienceService.getExperienceByKey(companyName, position)
    .takeWhile(() => this.aliveExperienceSubscription)
    .subscribe(
        result => this.experience = result,
        error => console.log("Error :: " + error)
    );
  }

  public alertExperience(): void {
    alert(this.experience.companyName + " : " + this.experience.position + " : NumberOfProjects= " + this.experience.projects.length);
  }
}
