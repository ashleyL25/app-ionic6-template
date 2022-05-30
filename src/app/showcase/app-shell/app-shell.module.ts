import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { AppShellPage } from './app-shell.page';
import { ShowcaseService } from '../showcase.service';

import { AspectRatioPage } from './aspect-ratio/aspect-ratio.page';
import { ImageShellPage } from './image-shell/image-shell.page';
import { TextShellPage } from './text-shell/text-shell.page';
import { SimpleDataBindingPage } from './simple-data-binding/simple-data-binding.page';
import { DataStoreBasicPage } from './data-store-basic/data-store-basic.page';
import { DataStoreListPage } from './data-store-list/data-store-list.page';
import { DataStoreSubsetPage } from './data-store-subset/data-store-subset.page';
import { DataStoreCombinedPage } from './data-store-combined/data-store-combined.page';
import { DataStoreMultiplePage } from './data-store-multiple/data-store-multiple.page';
import { DataStorePaginationPage } from './data-store-pagination/data-store-pagination.page';
import { DataStoreStackedPage } from './data-store-stacked/data-store-stacked.page';
import { DataStoreDependantPage } from './data-store-dependant/data-store-dependant.page';

const routes: Routes = [
  {
    path: '',
    component: AppShellPage
  },
  {
    path: 'aspect-ratio',
    component: AspectRatioPage
  },
  {
    path: 'image-shell',
    component: ImageShellPage
  },
  {
    path: 'text-shell',
    component: TextShellPage
  },
  {
    path: 'simple-data-binding',
    component: SimpleDataBindingPage
  },
  {
    path: 'data-store-basic',
    component: DataStoreBasicPage
  },
  {
    path: 'data-store-list',
    component: DataStoreListPage
  },
  {
    path: 'data-store-subset',
    component: DataStoreSubsetPage
  },
  {
    path: 'data-store-combined',
    component: DataStoreCombinedPage
  },
  {
    path: 'data-store-multiple',
    component: DataStoreMultiplePage
  },
  {
    path: 'data-store-pagination',
    component: DataStorePaginationPage
  },
  {
    path: 'data-store-stacked',
    component: DataStoreStackedPage
  },
  {
    path: 'data-store-dependant',
    component: DataStoreDependantPage
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
    AppShellPage,
    AspectRatioPage,
    ImageShellPage,
    TextShellPage,
    SimpleDataBindingPage,
    DataStoreBasicPage,
    DataStoreListPage,
    DataStoreSubsetPage,
    DataStoreCombinedPage,
    DataStoreMultiplePage,
    DataStorePaginationPage,
    DataStoreStackedPage,
    DataStoreDependantPage
  ],
  providers: [
    ShowcaseService
  ]
})
export class AppShellModule {}
