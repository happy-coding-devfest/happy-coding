import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { FormationsComponent } from './components/formations/formations.component';

const routes: Routes = [
  {
    path: '', 
    component: BodyComponent,
    children: [
      {path: 'accueil', component: AproposComponent},
      {path: 'bus', component: CompetencesComponent},
      {path: 'historiques', component: ExperiencesComponent},
      {path: 'trajets', component: FormationsComponent},
      {path: '', redirectTo: 'accueil', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantsRoutingModule { }
