import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateExperienceModel, ExperienceModel, UpdateExperienceModel } from '../../models/experience.model';
import { ExperiencesService } from '../../services/experience.service';
declare var window: any;

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperiencesComponent implements OnInit {

  loading$!: Observable<boolean>;
  experiences$!: Observable<ExperienceModel[]>;
  updateModal: any;
  updateForm!: FormGroup;
  deleteModal: any;
  currentExperience!: ExperienceModel | null;
  createModal: any;
  createForm!: FormGroup;

  constructor(
    private experiencesService: ExperiencesService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dragScroll('.card_group');
    this.initObservables();
    this.experiencesService.getExperiences();
    this.initForm();
    this.currentExperience = null;
    this.initModal();
  }

  private initObservables(): void {
    this.loading$ = this.experiencesService.loading$;
    this.experiences$ = this.experiencesService.experiences$;
  }

  private dragScroll(element: string) {
    const slider = <HTMLElement>document.querySelector(`${element}`);
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
      nom_experience: [null, Validators.required],
      lieu: [null, Validators.required],
      annee: [null, Validators.required],
      description: null
    });

    this.updateForm = this.formbuilder.group({
      id: null, nom_experience: null, lieu: null, annee: null, description: null
    });
  }

  private initModal() : void {
    this.createModal = new window.bootstrap.Modal('#modalCreateExperience');
    this.updateModal = new window.bootstrap.Modal('#modalModifierExperience');
    this.deleteModal = new window.bootstrap.Modal('#modalSupprimerExperience');
  }

  private assignUpdateForm(donnees: ExperienceModel): void {
    this.updateForm = this.formbuilder.group({
      id: [donnees.id, Validators.required],
      nom_experience: [donnees.nom, Validators.required],
      lieu: [donnees.lieu, Validators.required],
      annee: [donnees.annee, Validators.required],
      description: [donnees.description?.split('<br>').join('\n')]
    });
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
    const donnees = this.createForm.value as CreateExperienceModel;
    donnees.description = donnees.description?.split('\n').join('<br>');
    if(donnees) {
      this.experiencesService.createExperience(donnees);
      this.onCloseCreate();
    }
  }

  // ================ UPDATE ===================
  listenStatusUpdateModal(donnees: ExperienceModel): void {
    this.assignUpdateForm(donnees);
    this.updateModal.show();
  }

  onCloseUpdate(): void {
    this.updateForm.reset();
    this.updateModal.hide();
  }

  onSubmitUpdate(): void {
    const donnees = this.updateForm.value as UpdateExperienceModel;
    donnees.description = donnees.description?.split('\n').join('<br>');
    if(donnees) {
      this.experiencesService.updateExperience(donnees);
      this.onCloseUpdate();
    }
  }

  // =============== DELETE ===================
  listenStatusDeleteModal(donnees: ExperienceModel): void {
    this.currentExperience = donnees;
    this.deleteModal.show();
  }

  onCloseDelete(): void {
    this.currentExperience = null;
    this.deleteModal.hide();
  }

  onConfirmDelete(): void {
    const donnees = this.currentExperience as ExperienceModel;
    if(donnees) {
      this.experiencesService.deleteExperience(donnees.id);
      this.onCloseDelete();
    }
  }
}
