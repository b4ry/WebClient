import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { TechnologyDto } from "../../models/dtos/technology.dto";
import { ProjectDto } from "../../models/dtos/project.dto";

@Component({
  selector: "app-skill-details",
  templateUrl: "./skill-details.component.html",
  styleUrls: ["./skill-details.component.css"]
})
export class SkillDetailsComponent implements OnInit {

  @Input() public selectedTechnologyDto: TechnologyDto;

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public navigateToProjectDetails(projectDto: ProjectDto) {
    this.router.navigate(["/projects", projectDto.name ]);
  }
}
