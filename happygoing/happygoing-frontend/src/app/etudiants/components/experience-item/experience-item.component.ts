import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExperienceModel } from '../../models/experience.model';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience!: ExperienceModel;
  @Output() statusUpdateModal = new EventEmitter<ExperienceModel>();
  @Output() statusDeleteModal = new EventEmitter<ExperienceModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(): void {
    this.statusUpdateModal.emit(this.experience);
  }

  onDelete(): void {
    this.statusDeleteModal.emit(this.experience);
  }
}
