import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: 'privacy-policy.page.html',
  styleUrls: [
    './styles/privacy-policy.page.scss'
  ]
})

export class PrivacyPolicyPage {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
