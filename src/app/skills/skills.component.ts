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

  private technologyName: string;
  private technologyIconClass: string;
  private technologyType: number;

  private technologyTypesEnum = TechnologyTypeEnum;

  private aliveTechnologySubscription: boolean = true;

  constructor(
    private technologyService: TechnologyService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.technologies = this.activatedRoute.snapshot.data['skills'];
  }

  ngOnDestroy(): void {
    this.aliveTechnologySubscription = false;
  }

  createTechnology() {
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
}
