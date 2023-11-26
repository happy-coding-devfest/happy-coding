import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantsRoutingModule } from './etudiants-routing.module';

import { BodyComponent } from './components/body/body.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { FormationsComponent } from './components/formations/formations.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';

import { FormationItemComponent } from './components/formation-item/formation-item.component';
import { CompetenceItemComponent } from './components/competence-item/competence-item.component';
import { ExperienceItemComponent } from './components/experience-item/experience-item.component';

import { ExperiencesService } from './services/experience.service';
import { ShortenPipe } from './pipes/shorten.pipe';
import { StatusColor } from './directives/status-color.directive';
import { TrajetsService } from './services/trajets.service';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { BusService } from './services/bus.service';

@NgModule({
  declarations: [
    BodyComponent,
    AproposComponent,
    CompetencesComponent,
    ExperiencesComponent,
    FormationsComponent,
    SidenavComponent,
    HeaderComponent,
    FormationItemComponent,
    CompetenceItemComponent,
    ExperienceItemComponent,
    ShortenPipe,
    StatusColor
  ],
  imports: [
    CommonModule,
    EtudiantsRoutingModule,
    SharedModule
  ],
  providers: [
    ExperiencesService,
    UserService,
    TrajetsService,
    BusService
  ]
})
export class EtudiantsModule { }
