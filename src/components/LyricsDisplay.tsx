import { useEffect, useRef } from 'react';

interface LyricLine {
  timestamp: number;
  text: string;
}

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  onSeek: (value: number[]) => void;
}

export const LyricsDisplay = ({ lyrics, currentTime, onSeek }: LyricsDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Find the current active lyric line
  const getActiveLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].timestamp) {
        return i;
      }
    }
    return -1;
  };

  const activeLyricIndex = getActiveLyricIndex();

  // Auto-scroll to active lyric
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;
      
      const containerHeight = container.clientHeight;
      const activeLineTop = activeLine.offsetTop;
      const activeLineHeight = activeLine.clientHeight;
      
      const scrollTop = activeLineTop - containerHeight / 2 + activeLineHeight / 2;
      
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  }, [activeLyricIndex]);

  const handleLyricClick = (timestamp: number) => {
    onSeek([timestamp]);
  };

  return (
    <div className="music-player-surface rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Lyrics</h2>
      <div 
        ref={containerRef}
        className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        <div className="space-y-3">
          {lyrics.map((line, index) => (
            <div
              key={index}
              ref={index === activeLyricIndex ? activeLineRef : null}
              onClick={() => handleLyricClick(line.timestamp)}
              className={`lyrics-line text-lg leading-relaxed transition-all duration-300 p-2 rounded-lg hover:bg-accent/20 ${
                index === activeLyricIndex 
                  ? 'active text-center transform' 
                  : 'text-center'
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
      
      {lyrics.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          <p className="text-lg">No lyrics available for this song</p>
          <p className="text-sm mt-2">Add lyrics to see synchronized text here</p>
        </div>
      )}
    </div>
  );
};