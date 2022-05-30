import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { UserService } from '../user.service';
import { UserFriendsPage } from './user-friends.page';
import { UserFriendsResolver } from './user-friends.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserFriendsPage,
    resolve: {
      data: UserFriendsResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserFriendsPage],
  providers: [
    UserFriendsResolver,
    UserService
  ]
})
export class UserFriendsPageModule {}
