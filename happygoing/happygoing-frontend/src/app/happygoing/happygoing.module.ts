import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HappygoingRoutingModule } from './happygoing-routing.module';

import { BodyComponent } from './components/body/body.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { BusComponent } from './components/bus/bus.component';
import { HistoriquesComponent } from './components/historiques/historiques.component';
import { TrajetsComponent } from './components/trajets/trajet.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';

import { TrajetItemComponent } from './components/trajet-item/trajet-item.component';
import { BusItemComponent } from './components/bus-item/bus-item.component';
import { HistoriqueItemComponent } from './components/historique-item/historique-item.component';

import { ShortenPipe } from './pipes/shorten.pipe';
import { StatusColor } from './directives/status-color.directive';
import { TrajetsService } from './services/trajets.service';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { BusService } from './services/bus.service';
import { HistoriquesService } from './services/historiques.service';

@NgModule({
  declarations: [
    BodyComponent,
    AccueilComponent,
    BusComponent,
    HistoriquesComponent,
    TrajetsComponent,
    SidenavComponent,
    HeaderComponent,
    TrajetItemComponent,
    BusItemComponent,
    HistoriqueItemComponent,
    ShortenPipe,
    StatusColor
  ],
  imports: [
    CommonModule,
    HappygoingRoutingModule,
    SharedModule
  ],
  providers: [
    UserService,
    TrajetsService,
    BusService,
    HistoriquesService
  ]
})
export class HappygoingModule { }
