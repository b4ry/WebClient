import { Component, OnInit } from '@angular/core';
import { TechnologyTypeService } from '../services/Skills/technology-types.service';
import { TechnologyService } from '../services/Skills/technology.service';
import { TechnologyTypeDto } from '../services/dtos/technology-type-dto';
import { TechnologyDto } from '../services/dtos/technology-dto';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  _technologyTypes: TechnologyTypeDto[];
  _technologies: TechnologyDto[];

  constructor(
    private technologyTypeService: TechnologyTypeService,
    private technologyServie: TechnologyService) { }

  ngOnInit() {
    this.getTechnologyTypes();
    this.getTechnologies();
  }

  getTechnologyTypes(): void {
    this.technologyTypeService.getTechnologyTypes()
        .subscribe(
            resultArray => this._technologyTypes = resultArray,
            error => console.log("Error :: " + error)
        )
  }

  getTechnologies(): void {
    this.technologyServie.getTechnologies()
        .subscribe(
            resultArray => this._technologies = resultArray,
            error => console.log("Error :: " + error)
        )
  }
}
