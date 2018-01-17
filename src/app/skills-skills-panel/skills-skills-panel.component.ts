import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';

@Component({
  selector: 'app-skills-skills-panel',
  templateUrl: './skills-skills-panel.component.html',
  styleUrls: ['./skills-skills-panel.component.css']
})
export class SkillsSkillsPanelComponent implements OnInit {

  @Input() selectedTechnologyDto: TechnologyDto;

  private technologyTypesDto: TechnologyTypeDto[] = [];
  private technologiesDto: TechnologyDto[] = [];

  public selectedTechTypeNames: string[] = [];

  @Output() notifyChangingListOfTechIcons: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyRebuildingListOfTechIcons: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifySelectingTechnology: EventEmitter<TechnologyDto> = new EventEmitter<TechnologyDto>();

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.technologyTypesDto = this.activatedRoute.snapshot.data['technologyTypes'];
    this.technologiesDto = this.activatedRoute.snapshot.data['skills'];
    
    let technologyName: string = this.activatedRoute.snapshot.params.technologyName;
    let technologyTypeName: string = this.activatedRoute.snapshot.params.technologyTypeName;

    if(technologyName && technologyTypeName) {
      this.selectedTechnologyDto = this.technologiesDto.find(technologyDto => technologyDto.name === technologyName);
      this.selectedTechnologyDto.itemState = "selected";
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName), 
          expandList: true
        });
    }
  }
  
  onToggleList(technologyTypeName: string): void {
    if (this.isExpandedTechType(technologyTypeName)){
      var index = this.selectedTechTypeNames.indexOf(technologyTypeName, 0);

      if(this.selectedTechnologyDto && this.selectedTechnologyDto.technologyType.name === technologyTypeName) {
        this.selectedTechnologyDto = null;
        this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      }

      this.selectedTechTypeNames.splice(index, 1);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName), 
          expandList: false
        });
    } else {
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName), 
          expandList: true
        });
    }

    if(this.selectedTechTypeNames.length === 0) {
      this.selectedTechnologyDto = null;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      // this.notifyRebuildingListOfTechIcons.emit(true);
    }
  }

  isExpandedTechType(technologyTypeName: string): boolean {
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }

  isTechnologyListVisible(technologyTypeName: string): boolean {
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }

  onSelectTechnology(technologyDto: TechnologyDto) {
    if(technologyDto !== this.selectedTechnologyDto) {

      this.technologiesDto.forEach(technology => {
        technology.itemState = "unselected";
      });

      this.selectedTechnologyDto = technologyDto;
      this.selectedTechnologyDto.itemState = "selected";
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    }
    else {
      this.selectedTechnologyDto = null;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);

      this.technologiesDto.forEach(technology => {
        technology.itemState = "listed";
      });

      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto, 
          expandList: false
        });
    }
  }
}
