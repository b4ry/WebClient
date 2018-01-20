import { Component, OnInit, OnDestroy, trigger, state, transition, animate, style, ChangeDetectorRef } from '@angular/core';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import "rxjs/add/operator/takeWhile";

import { TechnologyService } from '../services/skills/technology.service';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';
import { CreateTechnologyDto } from '../services/dtos/create-technology.dto';

import { TechnologyTypeEnum } from '../services/enums/technology-type.enum';
import { TechnologyItemStateEnum } from '../services/enums/technnology-item-state.enum';

@Component({
  selector: 'app-skills',
  animations: [
    trigger('itemState', [
        state('selected', style({transition: 'transform 2s',  transform: 'translateX(0) scale(1.5)'})),
        state('unselected', style({transition: 'transform 2s',  transform: 'translateX(0) scale(0.5)'})),
        state('listed', style({transition: 'transform 2s',  transform: 'translateX(0) scale(1)'})),
        state('void',   style({opacity: 0, display: 'none', transform: 'translateX(0) scale(0.5)'})),
        transition('* => void', [
            animate('1000ms', style({
                opacity: 0,
                transform: 'translateX(0) scale(0.5)'
            }))
        ]),
        transition('void => unselected', [
          animate('1000ms', style({
              opacity: 1,
              transform: 'translateX(0) scale(0.5)'
          }))
        ]),
        transition('void => listed', [
          animate('1000ms', style({
              opacity: 1,
              transform: 'translateX(0) scale(1)'
          }))
        ]),
    ])
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewChecked {

  private selectedTechnologyDto: TechnologyDto;

  private technologies: TechnologyDto[];
  private initialTechnologies: TechnologyDto[];

  private technologyName: string;
  private technologyIconClass: string;

  private technologyType: number;

  private technologyTypesEnum = TechnologyTypeEnum;

  private aliveTechnologySubscription: boolean = true;

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
    this.technologies = [];//this.activatedRoute.snapshot.data['skills'];
    // this.initialTechnologies = this.technologies;

    // this.initialTechnologies.forEach(initialTechnology => {
    //   initialTechnology.itemState = "listed";
    // });
  }

  ngOnDestroy(): void {
    this.aliveTechnologySubscription = false;
  }

  ngAfterViewChecked()
  {
    this.changeDetectorRef.detectChanges();
  }

  createTechnology(): void {
    let createTechnologyDto = new CreateTechnologyDto();

    createTechnologyDto.name = this.technologyName;
    createTechnologyDto.iconClass = this.technologyIconClass;
    createTechnologyDto.technologyTypeEnum = this.technologyType;

    this.technologyService.createTechnology(createTechnologyDto)
      .takeWhile(() => this.aliveTechnologySubscription)
      .subscribe(
        res => {
          console.log(res);
        },
      );
  }

  openSkillDetails(technologyName: string): void {
    this.router.navigate(['skills', technologyName]);
  }

  onNotifyChangingListOfTechIcons(expandListEvent: any): void {
    // if(this.technologies === this.initialTechnologies) {
    if(this.technologies.length === 0) {
      this.technologies = expandListEvent.techIconsArray;
    }
    // }

    if(expandListEvent.expandList) {
      for(var technologyDto of expandListEvent.techIconsArray) {
        let selectedTechnology: TechnologyDto = this.technologies.find(technologyDto => technologyDto.itemState === TechnologyItemStateEnum.Selected);
        // this.selectedTechnologyDto = selectedTechnology;

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
        
        if(!this.technologies.includes(technologyDto)) {
          this.technologies.push(technologyDto);
        }
      }
    }
    else {
      for(var technologyDto of expandListEvent.techIconsArray) {
        if(this.technologies.includes(technologyDto)) {
          var index = this.technologies.indexOf(technologyDto, 0);
          this.technologies.splice(index, 1);

          if(technologyDto.itemState === TechnologyItemStateEnum.Selected) {
            this.technologies.forEach(technologyDto => {
              technologyDto.itemState = TechnologyItemStateEnum.Listed;
            });
          }
        }
      }

      if(this.technologies.length === 0) {
        this.changeUrlWithoutRedirecting(null, null);
      }
    }
  }

  // onNotifyRebuildingListOfTechIcons(rebuildListOfTechIcons: boolean): void {
  //   if(rebuildListOfTechIcons) {
  //     this.initialTechnologies.forEach(initialTechnologyDto => {
  //       initialTechnologyDto.itemState = "listed";
  //     });

  //     this.technologies = this.initialTechnologies;

  //     for(var technologyDto of this.technologies) {
  //       if(technologyDto.itemState !== "selected") {
  //         technologyDto.itemState = "listed";
  //       }
  //     }
  //   }
  // }

  onNotifySelectingTechnology(selectedTechnologyDto: TechnologyDto): void {
    // if(!selectedTechnologyDto && this.technologies.includes(this.selectedTechnologyDto)) {
    //   this.technologies.forEach(TechnologyDto => {
    //     TechnologyDto.itemState = "listed";
    //   });
    // }

    this.technologies.forEach(technologyDto => {
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
  }

  onSelectTechnology(technologyDto: TechnologyDto): void {
    if(technologyDto.itemState !== TechnologyItemStateEnum.Selected) {
      technologyDto.itemState = TechnologyItemStateEnum.Selected;
      this.selectedTechnologyDto = technologyDto;

      this.changeUrlWithoutRedirecting(technologyDto.name, technologyDto.technologyType.name);

      for(var tech of this.technologies) {
        if(tech !== technologyDto) {
          tech.itemState = TechnologyItemStateEnum.Unselected;
        }
      }
    }
    else {
      this.technologies.forEach(technology => {
        technology.itemState = TechnologyItemStateEnum.Listed;
      });

      this.selectedTechnologyDto = null;
    }
  }

  private changeUrlWithoutRedirecting(technologyName: string, technologyTypeName: string): void {
    let url = this.router
      .createUrlTree([this.router.url.split('?')[0]], { queryParams: { technologyName: technologyName, technologyTypeName: technologyTypeName }})
      .toString();

    this.location.go(url);  
  }
}
