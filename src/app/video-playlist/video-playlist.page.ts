import { Component, OnInit, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { VideoPlaylistModel } from './video-playlist.model';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.page.html',
  styleUrls: [
    './styles/video-playlist.page.scss',
    './styles/video-playlist.shell.scss'
  ]
})
export class VideoPlaylistPage implements OnInit {
  ssr = true;
  start_playing = false;
  api: VgApiService;
  video_playlist_model: VideoPlaylistModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.video_playlist_model && this.video_playlist_model.isShell) ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    // In SSR show a placeholder for the <vg-player>
    if (isPlatformBrowser(this.platformId)) {
      this.ssr = false;
    }

    this.route.data
    .pipe(
      // Extract data for this page
      switchMap((resolvedRouteData) => resolvedRouteData['data'].state)
    )
    .subscribe((state: any) => {
      this.video_playlist_model = state;
      if (!state.isShell) {
        this.video_playlist_model.video_playlist = state.videos;
        this.video_playlist_model.selected_video = state.videos[0];
      }
    }, (error) => console.log(error));
  }

  playMedia(media) {
    // Check if this media is not the same we are currently playing
    if (media !== this.video_playlist_model.selected_video) {
      // Change sources
      this.video_playlist_model.selected_video = media;
      // When changing sources we wait until the metadata is loaded and then we start playing the video
    }
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    if (this.start_playing) {
      this.api.play();
    } else {
      this.start_playing = true;
    }
  }

  shareMedia() {
    const selectedVideo = this.video_playlist_model.selected_video;
    Share.share({
      title: selectedVideo.title,
      text: selectedVideo.description,
      url: 'https://ionicthemes.com/',
      dialogTitle: 'Share Media'
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  }
}
