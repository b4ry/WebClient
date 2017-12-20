import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { TechnologyTypeService } from '../services/skills/technology-type.service';
import { TechnologyService } from '../services/skills/technology.service';
import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

  private _technologyTypes: TechnologyTypeDto[];
  private _technologies: TechnologyDto[];

  private aliveTechnologyTypesSubscription: boolean = true;
  private aliveTechnologySubscription: boolean = true;

  constructor(
    private technologyTypeService: TechnologyTypeService,
    private technologyService: TechnologyService) { }

  ngOnInit() {
    this.getTechnologyTypes();
    this.getTechnologies();
  }

  ngOnDestroy(): void {
    this.aliveTechnologyTypesSubscription = false;
    this.aliveTechnologySubscription = false;
  }

  getTechnologyTypes(): void {
    this.technologyTypeService.getTechnologyTypes()
      .takeWhile(() => this.aliveTechnologyTypesSubscription)
      .subscribe(
          resultArray => this._technologyTypes = resultArray,
          error => console.log("Error :: " + error)
      )
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies()
      .takeWhile(() => this.aliveTechnologySubscription)
      .subscribe(
          resultArray => this._technologies = resultArray,
          error => console.log("Error :: " + error)
      )
  }


}
