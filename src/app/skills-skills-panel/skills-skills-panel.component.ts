import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';


@Component({
  selector: 'app-skills-skills-panel',
  templateUrl: './skills-skills-panel.component.html',
  styleUrls: ['./skills-skills-panel.component.css']
})
export class SkillsSkillsPanelComponent implements OnInit, OnDestroy {

  @Input() selectedTechnologyDto: TechnologyDto;
  
  @Output() notifyChangingListOfTechIcons: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyRebuildingListOfTechIcons: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifySelectingTechnology: EventEmitter<TechnologyDto> = new EventEmitter<TechnologyDto>();

  private technologyTypesDto: TechnologyTypeDto[] = [];
  private technologiesDto: TechnologyDto[] = [];

  public selectedTechTypeNames: string[] = [];
  
  private aliveTechnologyTypesSubscription: boolean = true;
  private aliveTechnologiesSubscription: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.takeWhile(() => this.aliveTechnologyTypesSubscription).subscribe(result => this.technologyTypesDto = result['technologyTypes']);
    this.activatedRoute.data.takeWhile(() => this.aliveTechnologiesSubscription).subscribe(result => this.technologiesDto = result['skills']);
    
    let technologyName: string = this.activatedRoute.snapshot.queryParams.technologyName;
    let technologyTypeName: string = this.activatedRoute.snapshot.queryParams.technologyTypeName;

    if(technologyName && technologyTypeName) {
      this.selectedTechnologyDto = this.technologiesDto.find(technologyDto => technologyDto.name === technologyName);
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName), 
          expandList: true
        });
    }
  }

  ngOnDestroy(): void {
    this.aliveTechnologiesSubscription = false;
    this.aliveTechnologyTypesSubscription = false;
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
      this.selectedTechnologyDto = technologyDto;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    }
    else {
      this.selectedTechnologyDto = null;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    }
  }
}
