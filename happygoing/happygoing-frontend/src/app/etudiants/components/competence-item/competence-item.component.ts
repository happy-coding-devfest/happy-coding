import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetenceModel } from '../../models/competence.model';

@Component({
  selector: 'app-competence-item',
  templateUrl: './competence-item.component.html',
  styleUrls: ['./competence-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetenceItemComponent implements OnInit {

  @Input() competence!: CompetenceModel;
  // @Output() statusUpdateModal = new EventEmitter<CompetenceModel>();
  // @Output() statusDeleteModal = new EventEmitter<CompetenceModel>();

  constructor() { }

  ngOnInit(): void {
  }

  // onUpdate(): void {
  //   this.statusUpdateModal.emit(this.competence);
  // }

  // onDelete(): void {
  //   this.statusDeleteModal.emit(this.competence);
  // }
}
