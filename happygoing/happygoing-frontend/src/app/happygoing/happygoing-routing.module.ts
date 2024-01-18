import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { BusComponent } from './components/bus/bus.component';
import { HistoriquesComponent } from './components/historiques/historiques.component';
import { TrajetsComponent } from './components/trajets/trajet.component';

const routes: Routes = [
  {
    path: '', 
    component: BodyComponent,
    children: [
      {path: 'accueil', component: AccueilComponent},
      {path: 'bus', component: BusComponent },
      {path: 'historiques', component: HistoriquesComponent },
      {path: 'trajets', component: TrajetsComponent},
      {path: '', redirectTo: 'accueil', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappygoingRoutingModule { }
