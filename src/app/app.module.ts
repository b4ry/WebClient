import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

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
import { SkillsSkillsPanelComponent } from './skills-skills-panel/skills-skills-panel.component';
import { StatisticsDialogComponent } from './statistics-dialog/statistics-dialog.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { ExperienceService } from './services/experiences/experience.service';
import { TechnologyTypeService } from './services/skills/technology-type.service';
import { TechnologyService } from './services/skills/technology.service';
import { ProjectService } from './services/projects/project.service';
import { UrlService } from './services/url.service';

import { MapTechnologyTypeEnumPipe } from './services/pipes/map-technology-type-enum.pipe';
import { EnumToDropdownPipe } from './services/pipes/enum-to-dropdown.pipe';
import { FilterTechnologiesPipe } from './services/pipes/filter-technologies.pipe';

import { GlobalErrorHandler } from './errors/GlobalErrorHandler.handler';

import { SkillsResolver } from './services/resolvers/skills.resolver';
import { TechnologyTypesResolver } from './services/resolvers/technology-types.resolver';
import { ProjectDetailsResolver } from './services/resolvers/project-details.resolver';
import { ProjectsResolver } from './services/resolvers/projects.resolver';

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
    StatisticsDialogComponent,
    ProjectDetailsComponent,
    MapTechnologyTypeEnumPipe,
    EnumToDropdownPipe,
    FilterTechnologiesPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule
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
    TechnologyTypesResolver,
    ProjectDetailsResolver,
    ProjectsResolver
   ],
  entryComponents: [ 
    StatisticsDialogComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
