import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BusModel } from '../../models/bus.model';

@Component({
  selector: 'app-bus-item',
  templateUrl: './bus-item.component.html',
  styleUrls: ['./bus-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusItemComponent implements OnInit {

  @Input() bus!: BusModel;

  constructor() { }

  ngOnInit(): void {
  }
}
