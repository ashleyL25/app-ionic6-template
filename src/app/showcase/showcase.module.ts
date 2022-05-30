import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const showcaseRoutes: Routes = [
  {
    path: '',
    children: [
      // /showcase/ redirect
      {
        path: '',
        redirectTo: 'app-shell',
        pathMatch: 'full',
      },
      {
        path: 'app-shell',
        loadChildren: () => import('./app-shell/app-shell.module').then(m => m.AppShellModule)
      },
      {
        path: 'custom-components',
        loadChildren: () => import('./custom-components/custom-components.module').then(m => m.CustomComponentsModule)
      },
      {
        path: 'route-resolvers-ux',
        loadChildren: () => import('./route-resolvers-ux/route-resolvers-ux.module').then(m => m.RouteResolversUXModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(showcaseRoutes),
    ComponentsModule
  ],
  declarations: [ ]
})
export class ShowcasePageModule {}
