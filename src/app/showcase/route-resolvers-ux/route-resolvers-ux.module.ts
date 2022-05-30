import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

import { RouteResovlersUXPage } from './route-resolvers-ux.page';
import { NonBlockingResolversPage } from './non-blocking-resolvers/non-blocking-resolvers.page';
import { BlockingResovlersPage } from './blocking-resolvers/blocking-resolvers.page';
import { ProgressiveShellResovlersPage } from './progressive-shell-resolvers/progressive-shell-resolvers.page';

import { BlockingResolver } from './blocking-resolvers/blocking.resolver';
import { NonBlockingResolver } from './non-blocking-resolvers/non-blocking.resolver';
import { ProgressiveShellResolver } from './progressive-shell-resolvers/progressive-shell.resolver';

import { ShowcaseService } from '../showcase.service';

const routes: Routes = [
  {
    path: '',
    component: RouteResovlersUXPage
  },
  {
    path: 'blocking-resolvers',
    component: BlockingResovlersPage,
    resolve: {
      data: BlockingResolver
    }
  },
  {
    path: 'non-blocking-resolvers',
    component: NonBlockingResolversPage,
    resolve: {
      data: NonBlockingResolver
    }
  },
  {
    path: 'progressive-shell-resolvers',
    component: ProgressiveShellResovlersPage,
    resolve: {
      data: ProgressiveShellResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    RouteResovlersUXPage,
    BlockingResovlersPage,
    NonBlockingResolversPage,
    ProgressiveShellResovlersPage
  ],
  providers: [
    BlockingResolver,
    NonBlockingResolver,
    ProgressiveShellResolver,
    ShowcaseService
  ]
})
export class RouteResolversUXModule {}
