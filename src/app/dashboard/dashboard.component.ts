import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public skillsPanelWidth: Number;
  public experiencesPanelHeight: Number;
  public projectsPanelWidth: Number;
  
  public skillsArrowLeftPosition: Number = 3.5;
  public projectsArrowRightPosition: Number = 96.5;

  public skillsButtonVisibility: string;
  public projectsButtonVisibility: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  openSkillsPanel() {
    if(this.skillsPanelWidth == 10) {
      this.skillsPanelWidth = 2;
      this.skillsArrowLeftPosition = 3.5;
      this.skillsButtonVisibility = "hidden";
    }
    else {
      this.skillsPanelWidth = 10;
      this.skillsArrowLeftPosition = 11.5;
      this.skillsButtonVisibility = "visible";
    }
  }

  openProjectsPanel() {
    if(this.projectsPanelWidth == 10) {
      this.projectsPanelWidth = 2;
      this.projectsArrowRightPosition = 96.5;
      this.projectsButtonVisibility = "hidden";
    }
    else {
      this.projectsPanelWidth = 10;
      this.projectsArrowRightPosition = 88.5;
      this.projectsButtonVisibility = "visible";
    }
  }

  openExperiencesPanel() {
    if(this.experiencesPanelHeight == 12) {
      this.experiencesPanelHeight = 0;
    }
    else {
      this.experiencesPanelHeight = 12;
    }
  }

  onNotifyClosingSkillsPanel(updatedSkillsPanelWidth:Number):void {
    this.skillsPanelWidth = updatedSkillsPanelWidth;
    this.skillsArrowLeftPosition = 3.5;
    this.skillsButtonVisibility = "hidden";
  }

  onNotifyClosingExperiencesPanel(updatedExperiencesPanelHeight:Number):void {
    this.experiencesPanelHeight = updatedExperiencesPanelHeight;
  }

  onNotifyClosingProjectsPanel(updatedProjectsPanelWidth:Number):void {
    this.projectsPanelWidth = updatedProjectsPanelWidth;
    this.projectsArrowRightPosition = 96.5;
    this.projectsButtonVisibility = "hidden";
  }
}
