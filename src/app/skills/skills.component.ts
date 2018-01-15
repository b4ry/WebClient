import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import "rxjs/add/operator/takeWhile";

import { TechnologyService } from '../services/skills/technology.service';
import { TechnologyTypeDto } from '../services/dtos/technology-type.dto';
import { TechnologyDto } from '../services/dtos/technology.dto';
import { CreateTechnologyDto } from '../services/dtos/create-technology.dto';
import { TechnologyTypeEnum } from '../services/enums/technology-type.enum';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

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
    this.technologies = this.activatedRoute.snapshot.data['skills'];
    this.initialTechnologies = this.technologies;
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
        }
      }
    }
  }

  onNotifyRebuildingListOfTechIcons(rebuildListOfTechIcons: boolean): void {
    if(rebuildListOfTechIcons) {
      this.technologies = this.initialTechnologies;
    }
  }
}
