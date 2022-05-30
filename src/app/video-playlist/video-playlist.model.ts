import { ShellModel } from '../shell/data-store';

export class VideoModel {
  title: string;
  description: string;
  thumbnail: string;
  sources: Array<{ src: string, type: string }>;
}

export class VideoPlaylistModel extends ShellModel {
  selected_video: VideoModel = new VideoModel();

  video_playlist: Array<VideoModel> = [
    new VideoModel(),
    new VideoModel(),
    new VideoModel()
  ];

  constructor() {
    super();
  }
}
