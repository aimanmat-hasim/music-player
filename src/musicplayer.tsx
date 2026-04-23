import React, { useEffect, useRef, useState } from 'react';
import { FaRandom, FaRedo } from 'react-icons/fa';
import ProgressBar from './progress_Bar';
import Controls from './control';

type TrackData = {
    id: number;
    title: string;
    artist: string;
    src: string;
    artwork: string;
};

interface MusicPlayerProps {
    currentTrack: TrackData;
    isPlaying: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    tracks: TrackData[];
    currentIndex: number;
    onTogglePlayPause: () => void;
    onNext: () => void;
    onToggleRepeat: () => void;
    onToggleShuffle: () => void;
    onEnded: () => void;
    onPrevious: () => void;
    onSelectTrack: (id: number) => void;
}

const GLOW_COLORS = [
    'rgba(40,120,180,0.32)',
    'rgba(74,124,89,0.32)',
    'rgba(124,74,124,0.32)',
    'rgba(160,60,60,0.32)',
    'rgba(42,80,124,0.32)',
];

const CARD_STYLES: Record<number, React.CSSProperties> = {
    [-2]: { transform: 'translateX(-200px) translateZ(-120px) rotateY(18deg) scale(0.72)', opacity: 0.45, zIndex: 1 },
    [-1]: { transform: 'translateX(-115px) translateZ(-50px) rotateY(10deg) scale(0.84)', opacity: 0.7, zIndex: 2 },
    [0]:  { transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)', opacity: 1, zIndex: 5 },
    [1]:  { transform: 'translateX(115px) translateZ(-50px) rotateY(-10deg) scale(0.84)', opacity: 0.7, zIndex: 2 },
    [2]:  { transform: 'translateX(200px) translateZ(-120px) rotateY(-18deg) scale(0.72)', opacity: 0.45, zIndex: 1 },
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
    currentTrack,
    isPlaying,
    isShuffle,
    isRepeat,
    tracks,
    currentIndex,
    onTogglePlayPause,
    onNext,
    onToggleRepeat,
    onToggleShuffle,
    onEnded,
    onPrevious,
    onSelectTrack,
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        setCurrentTime(0);
        setDuration(0);
        audio.load();
        if (isPlaying) {
            const p = audio.play();
            if (p !== undefined) p.catch(console.error);
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack.src]);

    const handleSeek = (time: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = time;
        setCurrentTime(time);
    };

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

    const total = tracks.length;
    const visibleCards = tracks
        .map((track, i) => {
            const raw = (i - currentIndex + total) % total;
            const relPos = raw > total / 2 ? raw - total : raw;
            return { track, i, relPos };
        })
        .filter(({ relPos }) => Math.abs(relPos) <= 2);

    const glowColor = GLOW_COLORS[currentIndex % GLOW_COLORS.length];

    return (
        <div className="mp-root">
            <div
                className="mp-bg-glow"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 20%, ${glowColor} 0%, transparent 70%)` }}
            />

            <div className="mp-carousel">
                {visibleCards.map(({ track, i, relPos }) => (
                    <div
                        key={track.id}
                        className="mp-card"
                        style={CARD_STYLES[relPos] ?? {}}
                        onClick={() => i === currentIndex ? onTogglePlayPause() : onSelectTrack(track.id)}
                    >
                        <img src={track.artwork} alt={track.title} />
                        <div className="mp-card-label">
                            <div className="mp-card-title">{track.title}</div>
                            <div className="mp-card-artist">{track.artist}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mp-mini-info">
                <div className="mp-track-name">{currentTrack.title}</div>
                <div className="mp-track-artist">{currentTrack.artist}</div>
            </div>

            <div className="mp-progress-area">
                <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
            </div>

            <div className="mp-controls-bar">
                <div className="mp-thumb">
                    <img src={currentTrack.artwork} alt={currentTrack.title} />
                </div>
                <div className="mp-playing-info">
                    <div className="mp-bar-title">{currentTrack.title}</div>
                    <div className="mp-bar-artist">{currentTrack.artist}</div>
                </div>
                <Controls
                    isPlaying={isPlaying}
                    onTogglePlayPause={onTogglePlayPause}
                    onNext={onNext}
                    onPrevious={handlePreviousSmart}
                />
                <div className="mp-extras">
                    <button
                        type="button"
                        className="mp-btn"
                        onClick={onToggleShuffle}
                        aria-label="Shuffle"
                        style={{ color: isShuffle ? '#e8a045' : 'rgba(255,255,255,0.6)' }}
                    >
                        <FaRandom size={14} />
                    </button>
                    <button
                        type="button"
                        className="mp-btn"
                        onClick={onToggleRepeat}
                        aria-label="Repeat"
                        style={{ color: isRepeat ? '#e8a045' : 'rgba(255,255,255,0.6)' }}
                    >
                        <FaRedo size={14} />
                    </button>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={onEnded}
                preload="metadata"
                hidden
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />
        </div>
    );
};

export default MusicPlayer;
