import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';

import { format, parseISO } from 'date-fns';

import { CheckboxCheckedValidator } from '../../../../validators/checkbox-checked.validator';

import { FirebaseUserModel } from '../firebase-user.model';
import { SelectUserImageModalComponent } from '../select-image/select-user-image.modal';
import { FirebaseCrudService } from '../../firebase-crud.service';

@Component({
  selector: 'app-firebase-update-user',
  templateUrl: './firebase-update-user.modal.html',
  styleUrls: [
    './styles/firebase-update-user.modal.scss',
    './styles/firebase-update-user.shell.scss'
  ],
})
export class FirebaseUpdateUserModalComponent implements OnInit {
  // "user" is passed in firebase-details.page
  @Input() user: FirebaseUserModel;
  // "modalId" is passed in firebase-details.page.
  // We use it to for the dismiss function
  @Input() modalId: string;

  updateUserForm: FormGroup;
  selectedAvatar: string;
  skills = [];
  formattedDate?: string;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public firebaseCrudService: FirebaseCrudService,
    public router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.selectedAvatar = this.user.avatar;

    this.updateUserForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      lastname: new FormControl(this.user.lastname, Validators.required),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(this.user.phone, Validators.required),
      birthdate: new FormControl(dayjs.unix(this.user.birthdate).format(), Validators.required),
      skills: new FormArray([], CheckboxCheckedValidator.minSelectedCheckboxes(1)),
      spanish: new FormControl(this.user.languages.spanish),
      english: new FormControl(this.user.languages.english),
      french: new FormControl(this.user.languages.french)
    });

    this.formatDate();

    this.firebaseCrudService.getSkills().subscribe(skills => {
      this.skills = skills;
      // create skill checkboxes
      this.skills.map((skill) => {
        let userSkillsIds = [];
        if (this.user.skills) {
          userSkillsIds = this.user.skills.map(function(skillId) {
            return skillId['id'];
          });
        }
        // set the control value to 'true' if the user already has this skill
        const control = new FormControl(userSkillsIds.includes(skill.id));
        (this.updateUserForm.controls.skills as FormArray).push(control);
      });
    });
  }

  formatDate() {
    this.formattedDate = format(parseISO(this.updateUserForm.value.birthdate), 'MMM d, yyyy');
  }

  get skillsFormArray() { return <FormArray>this.updateUserForm.get('skills'); }

  changeLangValue(value): string {
    switch (true) {
      case (value <= 3 ):
        return 'Novice';
      case (value > 3 && value <= 6 ):
        return 'Competent';
      case (value > 6 ):
        return 'Expert';
    }
  }

  dismissModal() {
   this.modalController.dismiss(undefined, undefined, this.modalId);
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.user.name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseCrudService.deleteUser(this.user.id)
            .then(
              () => {
                this.dismissModal();
                this.ngZone.run(() => this.router.navigate(['firebase/crud/listing'])).then();
              },
              err => console.log(err)
            );
          }
        }
      ]
    });
    await alert.present();
  }

  updateUser() {
    this.user.avatar = this.selectedAvatar;
    this.user.name = this.updateUserForm.value.name;
    this.user.lastname = this.updateUserForm.value.lastname;
    this.user.birthdate = dayjs(this.updateUserForm.value.birthdate).unix(); // save it in timestamp
    this.user.phone = this.updateUserForm.value.phone;
    this.user.email = this.updateUserForm.value.email;
    this.user.languages.spanish = this.updateUserForm.value.spanish;
    this.user.languages.english = this.updateUserForm.value.english;
    this.user.languages.french = this.updateUserForm.value.french;

    // get the ids of the selected skills
    const selectedSkills = [];

    this.updateUserForm.value.skills
    .map((value: any, index: number) => {
      if (value) {
        selectedSkills.push(this.skills[index].id);
      }
    });
    this.user.skills = selectedSkills;

    const {age, ...userData} = this.user; // we don't want to save the age in the DB because is something that changes over time

    this.firebaseCrudService.updateUser(userData)
    .then(
      () => this.dismissModal(),
      err => console.log(err)
    );
  }

  async changeUserImage() {
    const modal = await this.modalController.create({
      component: SelectUserImageModalComponent,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop()
    });

    modal.onDidDismiss().then(avatar => {
      if (avatar.data != null) {
        this.selectedAvatar = avatar.data.link;
      }
    });
    await modal.present();
  }
}
