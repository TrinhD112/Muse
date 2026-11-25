
export interface MusicCollection {
  id: string;
  title: string;
  description: string;
  genre: string;
  mood: string;
  color: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  audioUrl: string;
  color: string;
  image?: string;
  duration?: number;
  licenseUrl?: string;
  sourceUrl?: string;
}
