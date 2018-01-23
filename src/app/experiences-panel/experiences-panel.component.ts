import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { ExperienceDto } from '../services/dtos/experience.dto';
import { ExperienceService } from '../services/experiences/experience.service';

@Component({
  selector: 'app-experiences-panel',
  templateUrl: './experiences-panel.component.html',
  styleUrls: ['./experiences-panel.component.css']
})
export class ExperiencesPanelComponent implements OnInit, OnDestroy {

  @Input() experiencesPanelHeight: Number;
  @Input() buttonVisibility: string;

  @Output() notifyClosingExperiencesPanel: EventEmitter<Number> = new EventEmitter<Number>();
  
  private experiencesDto: ExperienceDto[] = [];
  private aliveExperienceSubscription: boolean = true;

  constructor(
    private router: Router, 
    private experienceService: ExperienceService
  ) { }

  ngOnInit() {
    this.getExperiences();
  }

  ngOnDestroy(): void {
    this.aliveExperienceSubscription = false;
  }

  getExperiences(): void {
    this.experienceService.getExperiences()
    .takeWhile(() => this.aliveExperienceSubscription)
    .subscribe(
        resultArray => this.experiencesDto = resultArray.slice(0, 5),
        error => console.log("Error :: " + error)
    )
  }

  closeExperiencesPanel(): void {
    this.experiencesPanelHeight = 0;
    this.notifyClosingExperiencesPanel.emit(this.experiencesPanelHeight);
  }
  
  navigateToExperiencesPage() {
    this.router.navigate(['/experiences']);
  }

  navigateToExperience(companyName: string, position: string) {
    this.router.navigate(['experience', companyName, position]);
  }
}
