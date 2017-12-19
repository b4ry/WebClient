import { Component, OnInit } from '@angular/core';
import { TechnologyTypeService } from '../services/Skills/technology-types.service';
import { TechnologyType } from '../services/dtos/technology-type';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  _technologyTypes: TechnologyType[];

  constructor(private technologyTypeService: TechnologyTypeService) { }

  ngOnInit() {
    this.getTechnologyTypes();
  }

  getTechnologyTypes(): void {
    this.technologyTypeService.getTechnologyTypes()
        .subscribe(
            resultArray => this._technologyTypes = resultArray,
            error => console.log("Error :: " + error)
        )
  }
}
