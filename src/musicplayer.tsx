import React, { useEffect, useRef } from 'react';

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
//onEnded //

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack, isPlaying, onEnded }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

// Keep audio playback in sync with isPlaying + track changes

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
//!audio
//ensure the new src is loaded when track changes 
        audio.load();

    if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise) {
        playPromise.catch((error) => {
            console.error('Playback error:', error);
        });
    }
    } else {
        audio.pause();
    }
}, [isPlaying, currentTrack.src]);
return (
    <div className="audio-engine">
        <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={onEnded}
        preload="metadata"
        hidden
        />
    </div>
    );
};

export default MusicPlayer;
