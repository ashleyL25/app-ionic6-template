import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { VideoPlaylistModel } from './video-playlist.model';
import { DataStore } from '../shell/data-store';
import { TransferStateHelper } from '../utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class VideoPlaylistService {

  private videoPlaylistDataStore: DataStore<VideoPlaylistModel>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) { }

  public getVideoPlaylistDataSource(): Observable<VideoPlaylistModel> {
    const rawDataSource = this.http.get<VideoPlaylistModel>('./assets/sample-data/video-playlist/video-playlist.json');

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('video-playlist-state', rawDataSource);

    return cachedDataSource;
  }

  public getVideoPlaylistStore(dataSource: Observable<VideoPlaylistModel>): DataStore<VideoPlaylistModel> {
    // Use cache if available
    if (!this.videoPlaylistDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: VideoPlaylistModel = new VideoPlaylistModel();
      this.videoPlaylistDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
        // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
        this.videoPlaylistDataStore.load(dataSource, 0);
      } else { // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.videoPlaylistDataStore.load(dataSource);
      }
    }

    return this.videoPlaylistDataStore;
  }
}
