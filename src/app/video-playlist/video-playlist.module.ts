import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPlaylistPage } from './video-playlist.page';
import { VideoPlaylistResolver } from './video-playlist.resolver';
import { VideoPlaylistService } from './video-playlist.service';
import { ComponentsModule } from '../components/components.module';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';


const routes: Routes = [
  {
    path: '',
    component: VideoPlaylistPage,
    resolve: {
      data: VideoPlaylistResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [ VideoPlaylistPage ],
  providers: [
    VideoPlaylistResolver,
    VideoPlaylistService
  ]
})
export class VideoPlaylistPageModule {}
