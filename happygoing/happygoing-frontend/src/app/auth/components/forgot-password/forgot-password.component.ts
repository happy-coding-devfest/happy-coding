import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ForgotPasswordModel } from '../../models/auth.model';
import { ForgotpassService } from '../../services/forgotpass.service';
import { emailValidator } from '../../Validators/email.validator';
import { svg } from './toast-svg';
declare var window: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailCtrl!: FormControl;
  emailForm!: FormGroup;
  forgotpassModal: any;

  loading!: boolean;

  titreToast!: string;
  iconePath1!: string;
  iconePath2!: string;
  messageToast!: string;
  svglist!: {success: string[], error: string[]};

  constructor(
    private formbuilder: FormBuilder,
    private forgotpassService: ForgotpassService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.svglist = svg;
    this.forgotpassModal = new window.bootstrap.Modal('#modalForgotPassword');
    this.emailCtrl = this.formbuilder.control('', [Validators.required, emailValidator()]);
    this.emailForm = this.formbuilder.group({
      email: this.emailCtrl
    });
  }

  getErrorCtrl(ctrl: AbstractControl) {
    if(ctrl.hasError('emailvalidator')) return 'Veuillez entrer une adresse email valide!';
    return;
  }

  onCloseForgotPassword(): void {
    this.emailCtrl.reset();
    this.forgotpassModal.hide();
  }

  onSubmitForgotPassword(): void {
    let toast =  new window.bootstrap
      .Toast(document.querySelector('#toastForgotPassword'));
    const donnees = this.emailForm.value as ForgotPasswordModel;
    if(donnees) {
      this.loading = true;
      this.forgotpassService.sendEmail(donnees).pipe(
        tap(() => {
          this.titreToast = 'Confirmation';
          this.iconePath1 = this.svglist.success[0];
          this.iconePath2 = this.svglist.success[1];
          this.messageToast = 'Vous allez recevroir un mail de recupération.\nMerci!';
          toast.show();
          this.loading = false;
          this.onCloseForgotPassword();
        })
      ).subscribe({
        error: response => {
          this.titreToast = 'Erreur';
          this.iconePath1 = this.svglist.error[0];
          this.iconePath2 = this.svglist.error[1];
          if(response.status === 403) {
            this.messageToast = "L'adresse email n'existe pas...";
          }
          else if(response.status === 406)
            this.messageToast = `Données invalides!`;
          else if(response.status === 0)
            this.messageToast = `Vous n'êtes pas connecté sur internet!`;
          else
            this.messageToast = `${response.error.message}: ${response.status}`;
          toast.show();
          this.loading = false;
        }
      });
    }
  }
}
