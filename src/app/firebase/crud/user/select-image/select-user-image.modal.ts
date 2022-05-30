import { Component, OnInit, HostBinding } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UserImageModel } from './user-image.model';
import { ShellModel } from '../../../../shell/data-store';
import { FirebaseCrudService } from '../../firebase-crud.service';

@Component({
  selector: 'app-select-user-image',
  templateUrl: './select-user-image.modal.html',
  styleUrls: [
    './styles/select-user-image.modal.scss',
    './styles/select-user-image.shell.scss'
  ]
})
export class SelectUserImageModalComponent implements OnInit {
  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  avatars: Array<UserImageModel> & ShellModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.avatars && this.avatars.isShell) ? true : false;
  }

  constructor(
    private modalController: ModalController,
    public firebaseCrudService: FirebaseCrudService
  ) { }

  ngOnInit() {
    const dataSource = this.firebaseCrudService.getAvatarsDataSource();
    const dataStore = this.firebaseCrudService.getAvatarsStore(dataSource);

    dataStore.state.subscribe(
      (state) => {
        this.avatars = state;
      },
      (error) => {}
    );
  }

  dismissModal(avatar?: UserImageModel) {
    this.modalController.dismiss(avatar);
  }
}
