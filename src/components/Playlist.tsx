import { Music, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
}

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  onSongSelect: (index: number) => void;
}

export const Playlist = ({ songs, currentSongIndex, onSongSelect }: PlaylistProps) => {
  return (
    <div className="music-player-surface rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Music className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">Up Next</h2>
      </div>
      
      <div className="space-y-3">
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => onSongSelect(index)}
            className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/20 ${
              index === currentSongIndex 
                ? 'bg-primary/10 border border-primary/20' 
                : 'hover:bg-accent/10'
            }`}
          >
            <div className="relative">
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium truncate ${
                index === currentSongIndex ? 'text-primary' : 'text-foreground'
              }`}>
                {song.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
            
            {index === currentSongIndex && (
              <div className="flex items-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-1 h-4 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {songs.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No songs in playlist</p>
          <p className="text-sm mt-1">Add songs to get started</p>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2 hover:bg-primary hover:text-primary-foreground"
        >
          <Music className="h-4 w-4" />
          Add Songs
        </Button>
      </div>
    </div>
  );
};