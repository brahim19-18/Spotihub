# Audio Files

Place your MP3 audio files in this folder to use them in the music player.

## File Structure:
```
public/audio/
├── song1.mp3
├── song2.mp3
└── your-audio-files.mp3
```

## Usage:
1. Add your MP3 files to this folder
2. Update the `songs` array in `src/components/MusicPlayer.tsx`
3. Set the `audioSrc` property to `"audio/your-filename.mp3"`
4. Add synchronized lyrics with timestamps in seconds

## Example Song Object:
```javascript
{
  id: 'unique-id',
  title: 'Your Song Title',
  artist: 'Artist Name',
  albumArt: albumArtImage, // Import your image
  audioSrc: 'audio/your-song.mp3',
  lyrics: [
    { timestamp: 0, text: 'First line of lyrics' },
    { timestamp: 5, text: 'Second line at 5 seconds' },
    { timestamp: 10, text: 'Third line at 10 seconds' }
  ]
}
```

## Tips:
- Use tools like Audacity to find exact timestamps for lyrics
- Keep lyrics concise for better readability
- MP3 format is recommended for best browser compatibility