import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsPanelComponent } from './skills-panel/skills-panel.component';
import { ExperiencesPanelComponent } from './experiences-panel/experiences-panel.component';
import { ProjectsPanelComponent } from './projects-panel/projects-panel.component';

import { ExperienceService } from './services/experience.service';
import { TechnologyTypeService } from './services/Skills/technology-types.service';
import { TechnologyService } from './services/Skills/technology.service';

import { MapTechnologyTypeEnumPipe } from './services/pipes/map-technology-type-enum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutMeComponent,
    FooterComponent,
    ExperiencesComponent,
    SkillsComponent,
    ProjectsComponent,
    SkillsPanelComponent,
    ExperiencesPanelComponent,
    ProjectsPanelComponent,
    MapTechnologyTypeEnumPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ 
    ExperienceService,
    TechnologyTypeService,
    TechnologyService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
