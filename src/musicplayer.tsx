import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from './progress_Bar';
import Control from './control';

type CurrentTrack = {
    title: string;
    artist: string;
    src: string;
};

interface MusicPlayerProps {
    currentTrack: CurrentTrack;
    isPlaying: boolean;
    isShuffle:boolean;
    isRepeat:boolean;

    onTogglePlayPause: () => void;
    onNext: () => void;
    onToggleRepeat: () => void;
    onToggleShuffle: () => void;
    onEnded: () => void;
    onPrevious: () => void; // Added onPrevious prop
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
    currentTrack,
    isPlaying,
    isShuffle,
    isRepeat,
    onTogglePlayPause,
    onNext,
    onToggleRepeat,
    onToggleShuffle,
    onEnded, 
    onPrevious 
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Progress state
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    // Keep audio playback in sync with isPlaying + track changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Reset progress when track changes
        setCurrentTime(0);
        setDuration(0);

        // Ensure the new src is loaded and play/pause accordingly
        audio.load();

        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error('Playback error:', error);
                });
            }
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack.src]);

    // Seek handler for ProgressBar
    const handleSeek = (time: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = time;
        setCurrentTime(time);
    };

    // Spotify-like Previous behavior 3-seconds rule
    const handlePreviousSmart = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
        }

        onPrevious();
    };

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) =>
        setCurrentTime(e.currentTarget.currentTime);

    const onLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) =>
        setDuration(e.currentTarget.duration);

    return (
        <div className="audio-engine">
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={onEnded}
                preload="metadata"
                hidden
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
            />

            <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
            />

            <Control
                isPlaying={isPlaying}
                isShuffle={isShuffle}
                isRepeat={isRepeat}
                onTogglePlayPause={onTogglePlayPause}
                onNext={onNext}
                onPrevious={handlePreviousSmart} 
                onToggleShuffle={onToggleShuffle}
                onToggleRepeat={onToggleRepeat}
            />
        </div>
    );
};

export default MusicPlayer;

