import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule } from "@angular/material";
import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExperiencesComponent } from "./components/experiences/experiences.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { AboutMeComponent } from "./components/about-me/about-me.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SkillsPanelComponent } from "./components/skills-panel/skills-panel.component";
import { ExperiencesPanelComponent } from "./components/experiences-panel/experiences-panel.component";
import { ProjectsPanelComponent } from "./components/projects-panel/projects-panel.component";
import { SkillDetailsComponent } from "./components/skill-details/skill-details.component";
import { ExperienceDetailsComponent } from "./components/experience-details/experience-details.component";
import { SkillsListComponent } from "./components/skills-list/skills-list.component";
import { StatisticsDialogComponent } from "./components/statistics-dialog/statistics-dialog.component";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";

import { ExperienceService } from "./services/experiences/experience.service";
import { TechnologyTypeService } from "./services/skills/technology-type.service";
import { TechnologyService } from "./services/skills/technology.service";
import { ProjectService } from "./services/projects/project.service";
import { UrlService } from "./services/url.service";

import { MapTechnologyTypeEnumPipe } from "./services/pipes/map-technology-type-enum.pipe";
import { EnumToDropdownPipe } from "./services/pipes/enum-to-dropdown.pipe";
import { FilterTechnologiesPipe } from "./services/pipes/filter-technologies.pipe";

import { GlobalErrorHandler } from "./errors/GlobalErrorHandler.handler";

import { SkillsResolver } from "./services/resolvers/skills.resolver";
import { TechnologyTypesResolver } from "./services/resolvers/technology-types.resolver";
import { ProjectDetailsResolver } from "./services/resolvers/project-details.resolver";
import { ProjectsResolver } from "./services/resolvers/projects.resolver";

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
    SkillsListComponent,
    StatisticsDialogComponent,
    ProjectDetailsComponent,
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
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
