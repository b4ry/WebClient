import { Component, OnInit, OnDestroy, trigger, state, transition, animate, style } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import "rxjs/add/operator/takeWhile";

import { TechnologyService } from '../services/skills/technology.service';

import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';
import { CreateTechnologyDto } from '../services/dtos/create-technology.dto';

import { TechnologyTypeEnum } from '../services/enums/technology-type.enum';

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
export class SkillsComponent implements OnInit, OnDestroy {

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
    private activatedRoute: ActivatedRoute) { }

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
    if(this.technologies === this.initialTechnologies) {
      this.technologies = expandListEvent.techIconsArray;
    }

    if(expandListEvent.expandList) {

      for(var technologyDto of expandListEvent.techIconsArray) {
        let selectedTechnology: TechnologyDto = this.technologies.find(technologyDto => technologyDto.itemState === "selected");

        if(selectedTechnology) {
          expandListEvent.techIconsArray.forEach(tech => {
            if(tech !== selectedTechnology) {
              tech.itemState = "unselected";
            }
          });
        }
        else {
          technologyDto.itemState = "listed";
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

          if(technologyDto.itemState === "selected") {
            this.technologies.forEach(technologyDto => {
              technologyDto.itemState = "listed";
            });
          }
        }
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
    this.selectedTechnologyDto = selectedTechnologyDto;
  }

  onSelectTechnology(technologyDto: TechnologyDto) {
    if(technologyDto.itemState !== "selected") {
      technologyDto.itemState = "selected";
      this.selectedTechnologyDto = technologyDto;

      for(var tech of this.technologies) {
        if(tech !== technologyDto) {
          tech.itemState = "unselected";
        }
      }
    }
    else {
      this.technologies.forEach(technology => {
        technology.itemState = "listed";
      });

      this.selectedTechnologyDto = null;
    }
  }
}
