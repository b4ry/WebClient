import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("skillsPanel", {read: ElementRef}) skillsPanel: ElementRef;
  public skillsPanelWidth: Number;
  public experiencesPanelHeight: Number;
  public projectsPanelWidth: Number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // console.log(this.skillsPanel.nativeElement.offsetWidth);
  }

  openSkillsPanel() {
    if(this.skillsPanelWidth == 10) {
      this.skillsPanelWidth = 0;
    }
    else {
      this.skillsPanelWidth = 10;
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

  redirectToSkillsPage() {
    this.router.navigate(['/skills']);
  }

  redirectToProjectsPage() {
    this.router.navigate(['/projects']);
  }

  redirectToExperiencesPage() {
    this.router.navigate(['/experiences']);
  }
}
