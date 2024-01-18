import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OuputModel } from '../../models/trajet.model';

@Component({
  selector: 'app-trajet-item',
  templateUrl: './trajet-item.component.html',
  styleUrls: ['./trajet-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrajetItemComponent implements OnInit {
  
  @Input() trajet!: OuputModel[];

  constructor() { }

  ngOnInit(): void { }
}
