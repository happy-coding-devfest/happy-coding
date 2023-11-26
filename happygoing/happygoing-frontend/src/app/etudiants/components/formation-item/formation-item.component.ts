import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormationModel } from '../../models/formation.model';

@Component({
  selector: 'app-formation-item',
  templateUrl: './formation-item.component.html',
  styleUrls: ['./formation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormationItemComponent implements OnInit {
  
  @Input() trajet!: string;

  constructor() { }

  ngOnInit(): void { }
}
