import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SkillDetailsComponent } from './skill-details/skill-details.component';
import { ExperienceDetailsComponent } from './experience-details/experience-details.component';

import { ExperienceService } from './services/experiences/experience.service';
import { TechnologyTypeService } from './services/skills/technology-type.service';
import { TechnologyService } from './services/skills/technology.service';
import { ProjectService } from './services/projects/project.service';
import { UrlService } from './services/url.service';

import { MapTechnologyTypeEnumPipe } from './services/pipes/map-technology-type-enum.pipe';
import { EnumToDropdownPipe } from './services/pipes/enum-to-dropdown.pipe';

import { GlobalErrorHandler } from './errors/GlobalErrorHandler.handler';

import { SkillsResolver } from './services/resolvers/skills.resolver';
import { SkillsSkillsPanelComponent } from './skills-skills-panel/skills-skills-panel.component';
import { TechnologyTypesResolver } from './services/resolvers/technologyTypes.resolver';
import { FilterTechnologiesPipe } from './services/pipes/filter-technologies.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    SkillDetailsComponent,
    ExperienceDetailsComponent,
    SkillsSkillsPanelComponent,
    MapTechnologyTypeEnumPipe,
    EnumToDropdownPipe,
    FilterTechnologiesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [ 
    ExperienceService,
    TechnologyTypeService,
    TechnologyService,
    ProjectService,
    UrlService,
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    },
    SkillsResolver,
    TechnologyTypesResolver
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
