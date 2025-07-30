import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { LyricsDisplay } from './LyricsDisplay';
import { Playlist } from './Playlist';
import demoAlbum from '@/assets/demo-album.jpg';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
  lyrics: LyricLine[];
}

interface LyricLine {
  timestamp: number; // in seconds
  text: string;
}

const songs: Song[] = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    artist: 'Synthwave Studio',
    albumArt: demoAlbum,
    audioSrc: 'audio/cosmic-dreams.mp3',
    lyrics: [
      { timestamp: 0, text: 'Welcome to the music player' },
      { timestamp: 3, text: 'These lyrics will highlight in sync' },
      { timestamp: 6, text: 'Just like Spotify does' },
      { timestamp: 10, text: 'Add your own songs and lyrics' },
      { timestamp: 15, text: 'Enjoy the synchronized experience' },
      { timestamp: 20, text: 'Click on any lyric line to jump to that time' },
      { timestamp: 25, text: 'The current line glows with Spotify green' },
      { timestamp: 30, text: 'Add your audio files to the public/audio folder' },
      { timestamp: 35, text: 'Update the songs array with your tracks' },
      { timestamp: 40, text: 'Enjoy your custom music experience!' }
    ]
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'Future Beats',
    albumArt: demoAlbum,
    audioSrc: 'audio/digital-horizon.mp3',
    lyrics: [
      { timestamp: 0, text: 'Another demo song with synchronized lyrics' },
      { timestamp: 4, text: 'Add as many songs as you want' },
      { timestamp: 8, text: 'Each with their own lyric timings' },
      { timestamp: 12, text: 'Perfect synchronization every time' }
    ]
  }
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds in, restart current song
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      // Go to previous song
      const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
      setCurrentSongIndex(newIndex);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Player */}
        <div className="lg:col-span-2 space-y-6">
          {/* Now Playing Card */}
          <div className="music-player-surface rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={currentSong.albumArt}
                  alt={currentSong.title}
                  className="w-48 h-48 rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {currentSong.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {currentSong.artist}
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={isShuffle ? 'text-primary' : 'text-muted-foreground'}
                  >
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevious}
                    className="text-foreground hover:text-primary"
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    onClick={togglePlayPause}
                    size="icon"
                    className="play-button w-16 h-16 rounded-full text-primary-foreground"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="text-foreground hover:text-primary"
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={isRepeat ? 'text-primary' : 'text-muted-foreground'}
                  >
                    <Repeat className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Volume Control */}
                <div className="flex items-center gap-3 max-w-xs mx-auto md:mx-0">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0])}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-8">
                    {volume}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lyrics */}
          <LyricsDisplay 
            lyrics={currentSong.lyrics} 
            currentTime={currentTime}
            onSeek={handleSeek}
          />
        </div>
        
        {/* Playlist */}
        <div className="lg:col-span-1">
          <Playlist 
            songs={songs}
            currentSongIndex={currentSongIndex}
            onSongSelect={setCurrentSongIndex}
          />
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </div>
  );
};