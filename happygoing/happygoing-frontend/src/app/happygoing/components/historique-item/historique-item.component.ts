import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique-item',
  templateUrl: './historique-item.component.html',
  styleUrls: ['./historique-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoriqueItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
