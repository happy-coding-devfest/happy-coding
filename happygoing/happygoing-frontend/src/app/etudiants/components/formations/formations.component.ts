import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrajetsService } from '../../services/trajets.service';
import { CreateTrajetModel } from '../../models/trajet.model';
declare var window: any;

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormationsComponent implements OnInit {

  loading$!: Observable<boolean>;
  trajets$!: Observable<string[]>;
  createModal: any;
  createForm!: FormGroup;

  constructor(
    private trajetsService: TrajetsService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dragScroll('.card_group');
    this.initObservables();
    this.initForm();
    this.initModal();
  }

  private initObservables(): void {
    this.trajets$ = this.trajetsService.trajets$;
  }

  private dragScroll(element: string) {
    const slider = <HTMLElement>document.querySelector(element);
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      e.stopPropagation();
      slider.classList.add('active_card');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active_card');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  private initForm(): void {
    this.createForm = this.formbuilder.group({
      depart: [null, Validators.required],
      arrivee: [null, Validators.required],
      heure: [null, Validators.required]
    });
  }

  private initModal() : void {
    this.createModal = new window.bootstrap.Modal('#modalCreateFormation');
  }

  // ================ CREATE ===================
  listenStatusCreateModal(): void {
    this.createModal.show();
  }

  onCloseCreate(): void {
    this.createForm.reset();
    this.createModal.hide();
  }

  onSubmitCreate(): void {
    const donnees = this.createForm.value as CreateTrajetModel;
    this.trajetsService.findPath(donnees);
  }
}
