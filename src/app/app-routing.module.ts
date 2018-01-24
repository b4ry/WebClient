import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillDetailsComponent } from './skill-details/skill-details.component';
import { ExperienceDetailsComponent } from './experience-details/experience-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SkillsResolver } from './services/resolvers/skills.resolver';
import { TechnologyTypesResolver } from './services/resolvers/technology-types.resolver';
import { ProjectDetailsResolver } from './services/resolvers/project-details.resolver';
import { ProjectsResolver } from './services/resolvers/projects.resolver';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'about-me', 
    component: AboutMeComponent 
  },
  { 
    path: 'experiences', 
    component: ExperiencesComponent 
  },
  { 
    path: 'experience/:companyName/:position', 
    component: ExperienceDetailsComponent 
  },
  { 
    path: 'projects', 
    component: ProjectsComponent,
    resolve: {
      projects: ProjectsResolver
    } 
  },
  {
    path: 'projects/:projectName',
    component: ProjectDetailsComponent,
    resolve: {
      projectDetails: ProjectDetailsResolver,
      projects: ProjectsResolver
    }
  },
  { 
    path: 'skills', 
    component: SkillsComponent,
    resolve: {
      skills: SkillsResolver,
      technologyTypes: TechnologyTypesResolver
    } 
  },
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
