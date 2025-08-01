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
    id: 'alida',
    title: 'Alida',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/1-Alida.mp3',
    lyrics: [
      { timestamp: 0, text: 'Soft as the hush when the moon says goodbye' },
      { timestamp: 4, text: 'You fade into light without needing to try' },
      { timestamp: 8, text: 'Seventeen candles, one still aglow' },
      { timestamp: 12, text: 'You carry the night wherever you go' },
      { timestamp: 16, text: '' },
      { timestamp: 18, text: 'Alida…' },
      { timestamp: 22, text: 'The name that sounds like sky' },
      { timestamp: 26, text: 'Like stars exhaling lullabies' },
      { timestamp: 30, text: '' },
      { timestamp: 34, text: 'You were the poem I didn\'t yet know' },
      { timestamp: 38, text: 'The echo that taught the silence to glow' },
      { timestamp: 42, text: 'You smiled like a secret too warm to keep' },
      { timestamp: 46, text: 'You danced in my dreams, and stayed in my sleep' },
      { timestamp: 50, text: '' },
      { timestamp: 54, text: 'If I never find the words, let this song be' },
      { timestamp: 58, text: 'A map of all you mean to me' },
      { timestamp: 62, text: 'Alida —' },
      { timestamp: 66, text: 'The moon in my memory' }
    ]
  },
  {
    id: 'under-the-same-moon',
    title: 'Under the Same Moon',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/2-under-the-same-moon.mp3',
    lyrics: [
      { timestamp: 0, text: 'Seventeen candles, the sky feels wide' },
      { timestamp: 4, text: 'You\'re in Tashkent, I\'m oceans aside' },
      { timestamp: 8, text: 'You laugh like morning, but your eyes hold night' },
      { timestamp: 12, text: 'Like the moon hiding tears in the quiet twilight' },
      { timestamp: 16, text: '' },
      { timestamp: 18, text: 'You speak like stories written in stars' },
      { timestamp: 22, text: 'English dreams and Korean hearts' },
      { timestamp: 26, text: 'You look like China carved in snow' },
      { timestamp: 30, text: 'But your soul is the light that the eclipse won\'t show' }
    ]
  },
  {
    id: 'are-you-happy',
    title: 'Are you happy?',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/3-Are you happy?.mp3',
    lyrics: [
      { timestamp: 0, text: 'Seventeen candles in the dark,' },
      { timestamp: 4, text: 'Your light still reaches me, Moonchild.' },
      { timestamp: 8, text: 'Tashkent nights, so far apart,' },
      { timestamp: 12, text: 'But your glow lingers in my sky...' }
    ]
  },
  {
    id: 'midnight-in-tashkent',
    title: 'Midnight in Tashkent',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/4-Midnight in Tashkant .mp3',
    lyrics: [
      { timestamp: 0, text: 'Midnight in Tashkent, the stars align' },
      { timestamp: 4, text: 'Your shadow dances with mine' },
      { timestamp: 8, text: 'In the silence between heartbeats' },
      { timestamp: 12, text: 'I find you in my dreams...' }
    ]
  },
  {
    id: 'fashionably-late',
    title: 'Fashionably Late',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/5-Fashionably late .mp3',
    lyrics: [
      { timestamp: 0, text: 'Always arriving fashionably late' },
      { timestamp: 4, text: 'But your timing is worth the wait' },
      { timestamp: 8, text: 'Every moment with you' },
      { timestamp: 12, text: 'Makes the world feel new...' }
    ]
  },
  {
    id: 'alida-youre-my-moon',
    title: 'Alida, You\'re My Moon!',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/6-Alida, You\'re My Moon!.mp3',
    lyrics: [
      { timestamp: 0, text: 'Alida, you\'re my moon in the darkest night' },
      { timestamp: 4, text: 'Guiding me with your gentle light' },
      { timestamp: 8, text: 'Through the phases of my heart' },
      { timestamp: 12, text: 'You\'ve been there from the start...' }
    ]
  },
  {
    id: 'uzbek-girl',
    title: 'Uzbek Girl',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/7-Uzbek Girl .mp3',
    lyrics: [
      { timestamp: 0, text: 'Beautiful Uzbek girl with eyes so bright' },
      { timestamp: 4, text: 'You illuminate my world with your light' },
      { timestamp: 8, text: 'From Tashkent streets to my heart' },
      { timestamp: 12, text: 'You\'ve captured every part...' }
    ]
  },
  {
    id: 'cat-eyes-galaxy-mind',
    title: 'Cat Eyes, Galaxy Mind',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/8-Cat Eyes, Galaxy Mind.mp3',
    lyrics: [
      { timestamp: 0, text: 'Cat eyes that see through my soul' },
      { timestamp: 4, text: 'Galaxy mind that makes me whole' },
      { timestamp: 8, text: 'In your universe I\'m lost' },
      { timestamp: 12, text: 'No price too high, no bridge to cross...' }
    ]
  },
  {
    id: 'sakura-and-snow',
    title: 'Sakura and Snow',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/9-Sakura and Snow.mp3',
    lyrics: [
      { timestamp: 0, text: 'Sakura petals falling like snow' },
      { timestamp: 4, text: 'Reminding me of you, wherever I go' },
      { timestamp: 8, text: 'Spring meets winter in your smile' },
      { timestamp: 12, text: 'Making every moment worthwhile...' }
    ]
  },
  {
    id: 'taehyungs-shadow',
    title: 'Taehyung\'s Shadow',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/10-Taehyung\'s Shadow .mp3',
    lyrics: [
      { timestamp: 0, text: 'In Taehyung\'s shadow I see your face' },
      { timestamp: 4, text: 'A melody that time cannot erase' },
      { timestamp: 8, text: 'Korean dreams and distant shores' },
      { timestamp: 12, text: 'My heart forever yours...' }
    ]
  },
  {
    id: 'subtitle-love',
    title: 'Subtitle Love',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/11-Subtitle Love .mp3',
    lyrics: [
      { timestamp: 0, text: 'Reading subtitles of your heart' },
      { timestamp: 4, text: 'Every word a work of art' },
      { timestamp: 8, text: 'Languages we don\'t need to speak' },
      { timestamp: 12, text: 'Love is all we need to seek...' }
    ]
  },
  {
    id: 'bias-and-beat',
    title: 'Bias & Beat',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/12-Bias & Beat.mp3',
    lyrics: [
      { timestamp: 0, text: 'You\'re my bias in this game of hearts' },
      { timestamp: 4, text: 'To your rhythm my soul departs' },
      { timestamp: 8, text: 'Every beat syncs with my mind' },
      { timestamp: 12, text: 'In your melody, peace I find...' }
    ]
  },
  {
    id: 'didnt-get-it',
    title: 'Didn\'t Get It',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/13-Didn\'t Get It.mp3',
    lyrics: [
      { timestamp: 0, text: 'I didn\'t get it at first sight' },
      { timestamp: 4, text: 'How you could make everything right' },
      { timestamp: 8, text: 'But now I see so clearly' },
      { timestamp: 12, text: 'You\'re everything to me, sincerely...' }
    ]
  },
  {
    id: 'eclipse',
    title: 'Eclipse',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/14-Eclipse.mp3',
    lyrics: [
      { timestamp: 0, text: 'Like an eclipse you block my sun' },
      { timestamp: 4, text: 'But in darkness, you\'re the one' },
      { timestamp: 8, text: 'Who shows me stars I\'ve never seen' },
      { timestamp: 12, text: 'In your shadow, I find my dream...' }
    ]
  },
  {
    id: 'if-we-ever-met',
    title: 'If We Ever Met',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/15-If We Ever Met.mp3',
    lyrics: [
      { timestamp: 0, text: 'If we ever met beneath the stars' },
      { timestamp: 4, text: 'Would you recognize these scars?' },
      { timestamp: 8, text: 'Of a heart that beats for you alone' },
      { timestamp: 12, text: 'In a world where love has grown...' }
    ]
  },
  {
    id: 'static-between-us',
    title: 'Static between us',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/16-Static between us.mp3',
    lyrics: [
      { timestamp: 0, text: 'Static between us, but I hear you clear' },
      { timestamp: 4, text: 'Every whisper reaches my ear' },
      { timestamp: 8, text: 'Through the noise and through the pain' },
      { timestamp: 12, text: 'Your voice keeps me sane...' }
    ]
  },
  {
    id: 'love-and-mine',
    title: 'Love & Mine',
    artist: 'ibroTN19',
    albumArt: demoAlbum,
    audioSrc: 'audio/17-Love & Mine.mp3',
    lyrics: [
      { timestamp: 0, text: 'Love is yours and love is mine' },
      { timestamp: 4, text: 'In this moment, stars align' },
      { timestamp: 8, text: 'What we have transcends all time' },
      { timestamp: 12, text: 'In your heart, I find my rhyme...' }
    ]
  }
];

export function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = songs[currentSong];

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
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume[0] / 100;
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

  const handleNext = () => {
    if (repeatMode === 'one') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      return;
    }

    const nextIndex = isShuffled 
      ? Math.floor(Math.random() * songs.length)
      : (currentSong + 1) % songs.length;
    
    setCurrentSong(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prevIndex);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekFromLyrics = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-3rem)]">
          {/* Main Player */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Album Art & Info */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="relative mb-6 group">
                  <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={song.albumArt} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h1 className="text-4xl font-bold text-foreground mb-2">{song.title}</h1>
                <p className="text-xl text-muted-foreground">{song.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[duration ? (currentTime / duration) * 100 : 0]}
                  onValueChange={handleSeek}
                  className="w-full"
                  max={100}
                  step={0.1}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant={isShuffled ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleShuffle}
                  className="w-10 h-10"
                >
                  <Shuffle className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handlePrevious}
                  className="w-12 h-12"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleNext}
                  className="w-12 h-12"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>

                <Button
                  variant={repeatMode !== 'off' ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleRepeat}
                  className="w-10 h-10 relative"
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                      1
                    </span>
                  )}
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  className="flex-1"
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground w-8">{volume[0]}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <LyricsDisplay 
              lyrics={song.lyrics} 
              currentTime={currentTime}
              onSeek={handleSeekFromLyrics}
            />
            <Playlist 
              songs={songs}
              currentSongIndex={currentSong}
              onSongSelect={setCurrentSong}
            />
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={song.audioSrc}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />
    </div>
  );
}