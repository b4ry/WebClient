import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';

@Component({
  selector: 'app-skills-skills-panel',
  templateUrl: './skills-skills-panel.component.html',
  styleUrls: ['./skills-skills-panel.component.css']
})
export class SkillsSkillsPanelComponent implements OnInit {

  private technologyTypes: TechnologyTypeDto[] = [];
  private technologies: TechnologyDto[] = [];

  public selectedTechTypeNames: string[] = [];

  @Output() notifyChangingListOfTechIcons: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyRebuildingListOfTechIcons: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.technologyTypes = this.activatedRoute.snapshot.data['technologyTypes'];
    this.technologies = this.activatedRoute.snapshot.data['skills'];
  }
  
  toggleList(technologyTypeName: string): void {
    if (this.isExpandedTechType(technologyTypeName)){
      var index = this.selectedTechTypeNames.indexOf(technologyTypeName, 0);
      this.selectedTechTypeNames.splice(index, 1);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologies.filter(technology => technology.technologyType.name === technologyTypeName), 
          expandList: false
        });
    } else {
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologies.filter(technology => technology.technologyType.name === technologyTypeName), 
          expandList: true
        });
    }

    if(this.selectedTechTypeNames.length === 0) {
      this.notifyRebuildingListOfTechIcons.emit(true);
    }
  }

  isExpandedTechType(technologyTypeName: string): boolean {
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }

  isTechnologyListVisible(technologyTypeName: string){
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }
}
