import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from './progress_Bar';

type CurrentTrack = {
    title: string;
    artist: string;
    src: string;
};

interface MusicPlayerProps {
    currentTrack: CurrentTrack;
    isPlaying: boolean;
    onEnded: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack, isPlaying, onEnded }) => {
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
        </div>
    );
};

export default MusicPlayer;

