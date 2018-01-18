import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private skillsPanelWidth: Number;
  private experiencesPanelHeight: Number;
  private projectsPanelWidth: Number;

  private buttonVisibility: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  openSkillsPanel() {
    if(this.skillsPanelWidth == 10) {
      this.skillsPanelWidth = 0;
      this.buttonVisibility = "hidden";
    }
    else {
      this.skillsPanelWidth = 10;
      this.buttonVisibility = "visible";
    }
  }

  openProjectsPanel() {
    if(this.projectsPanelWidth == 10) {
      this.projectsPanelWidth = 0;
    }
    else {
      this.projectsPanelWidth = 10;
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
  }

  onNotifyClosingExperiencesPanel(updatedExperiencesPanelHeight:Number):void {
    this.experiencesPanelHeight = updatedExperiencesPanelHeight;
  }

  onNotifyClosingProjectsPanel(updatedProjectsPanelWidth:Number):void {
    this.projectsPanelWidth = updatedProjectsPanelWidth;
  }
}
