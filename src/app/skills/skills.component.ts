import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import "rxjs/add/operator/takeWhile";

import { TechnologyService } from '../services/skills/technology.service';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';
// import { CreateTechnologyDto } from '../services/dtos/create-technology.dto';

// import { TechnologyTypeEnum } from '../services/enums/technology-type.enum';
import { TechnologyItemStateEnum } from '../services/enums/technnology-item-state.enum';

import { techIconAnimations } from './tech-icon-animations.animation';

@Component({
  selector: 'app-skills',
  animations: [ techIconAnimations ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewChecked {

  public selectedTechnologyDto: TechnologyDto;

  public technologiesDto: TechnologyDto[];
  public initialTechnologies: TechnologyDto[];

  // private aliveTechnologySubscription: boolean = true;

  constructor(
    private technologyService: TechnologyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location
  ) { 
    this.location = location;
  }

  ngOnInit(): void {
    this.technologiesDto = [];
  }

  ngOnDestroy(): void {
    // this.aliveTechnologySubscription = false;
  }

  ngAfterViewChecked()
  {
    this.changeDetectorRef.detectChanges();
  }

  // createTechnology(): void {
  //   let createTechnologyDto = new CreateTechnologyDto();

  //   createTechnologyDto.name = this.technologyName;
  //   createTechnologyDto.iconClass = this.technologyIconClass;
  //   createTechnologyDto.technologyTypeEnum = this.technologyType;

  //   this.technologyService.createTechnology(createTechnologyDto)
  //     .takeWhile(() => this.aliveTechnologySubscription)
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //       },
  //     );
  // }

  openSkillDetails(technologyName: string): void {
    this.router.navigate(['skills', technologyName]);
  }

  onNotifyChangingListOfTechIcons(expandListEvent: any): void {
    if(this.technologiesDto.length === 0) {
      this.technologiesDto = expandListEvent.techIconsArray;
    }

    if(expandListEvent.expandList) {
      for(var technologyDto of expandListEvent.techIconsArray) {
        let selectedTechnology: TechnologyDto = this.technologiesDto.find(technologyDto => technologyDto.itemState === TechnologyItemStateEnum.Selected);

        if(selectedTechnology) {
          expandListEvent.techIconsArray.forEach(tech => {
            if(tech !== selectedTechnology) {
              tech.itemState = TechnologyItemStateEnum.Unselected;
            }
          });
        }
        else {
          technologyDto.itemState = TechnologyItemStateEnum.Listed;
        }
        
        if(!this.technologiesDto.includes(technologyDto)) {
          this.technologiesDto.push(technologyDto);
        }
      }
    }
    else {
      for(var technologyDto of expandListEvent.techIconsArray) {
        if(this.technologiesDto.includes(technologyDto)) {
          var index = this.technologiesDto.indexOf(technologyDto, 0);
          this.technologiesDto.splice(index, 1);
        }
      }

      if(this.technologiesDto.length === 0) {
        this.changeUrlWithoutRedirecting(null, null);
      }
    }
  }

  onNotifySelectingTechnology(selectedTechnologyDto: TechnologyDto): void {
    this.technologiesDto.forEach(technologyDto => {
      if(selectedTechnologyDto) {
        technologyDto.itemState = TechnologyItemStateEnum.Unselected;
      }
      else {
        technologyDto.itemState = TechnologyItemStateEnum.Listed;
      }
    });

    this.selectedTechnologyDto = selectedTechnologyDto;

    if(this.selectedTechnologyDto) {
      this.selectedTechnologyDto.itemState = TechnologyItemStateEnum.Selected;
      this.changeUrlWithoutRedirecting(selectedTechnologyDto.name, selectedTechnologyDto.technologyType.name);
    }
    else {
      this.changeUrlWithoutRedirecting(null, null);
    }
  }

  onSelectTechnology(technologyDto: TechnologyDto): void {
    if(technologyDto.itemState !== TechnologyItemStateEnum.Selected) {
      technologyDto.itemState = TechnologyItemStateEnum.Selected;
      this.selectedTechnologyDto = technologyDto;
      this.changeUrlWithoutRedirecting(technologyDto.name, technologyDto.technologyType.name);

      for(var tech of this.technologiesDto) {
        if(tech !== technologyDto) {
          tech.itemState = TechnologyItemStateEnum.Unselected;
        }
      }
    }
    else {
      this.technologiesDto.forEach(technology => {
        technology.itemState = TechnologyItemStateEnum.Listed;
      });

      this.selectedTechnologyDto = null;
      this.changeUrlWithoutRedirecting(null, null);
    }
  }

  private changeUrlWithoutRedirecting(technologyName: string, technologyTypeName: string): void {
    let url = this.router
      .createUrlTree([this.router.url.split('?')[0]], { queryParams: { technologyName: technologyName, technologyTypeName: technologyTypeName }})
      .toString();

    this.location.go(url);  
  }
}
