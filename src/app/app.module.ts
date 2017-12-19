import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ExperienceService } from './services/experience.service';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechnologyTypeService } from './services/Skills/technology-types.service';
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
    TechnologyTypeService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
