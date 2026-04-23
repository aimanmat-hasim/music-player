import React, { useState, useEffect, useRef } from 'react';
import { FaMusic } from 'react-icons/fa';
import MusicPlayer from "./musicplayer";

type Track = {
    id: number;
    title: string;
    artist: string;
    src: string;
    artwork: string;
};

const TRACKS: Track[] = [
    { id: 1, title: 'Lautan',           artist: 'Yuna',          src: "/assets/songs/lautan.mp3",           artwork: "/assets/artwork/yuna_lautan_image.jpg" },
    { id: 2, title: 'Akad',             artist: 'Payung Teduh',  src: "/assets/songs/akad.mp3",             artwork: "/assets/artwork/akad_payungteduh_image.jpg" },
    { id: 3, title: 'Sency',            artist: 'dia & Tenxi',   src: "/assets/songs/sency.mp3",            artwork: "/assets/artwork/sency_dia&tenxi_image.jpg" },
    { id: 4, title: 'Bunga Di Telinga', artist: 'Noh Salleh',    src: "/assets/songs/bunga-di-telinga.mp3", artwork: "/assets/artwork/bungaditelinga_nohsalleh_image.jpg" },
    { id: 5, title: 'Sempurna',         artist: 'Insomniacs',    src: "/assets/songs/sempurna.mp3",         artwork: "/assets/artwork/sempurn_insomniacks_image.jpg" },
];

type RepeatMode = 'off' | 'one' | 'all';

const App1: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
    const [, setHistory] = useState<number[]>([]);

    // Window open/close
    const [isOpen, setIsOpen] = useState(false);

    // Draggable window position (offset from center)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const posRef = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });

    useEffect(() => { posRef.current = position; }, [position]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const newPos = {
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y,
            };
            posRef.current = newPos;
            setPosition(newPos);
        };
        const onUp = () => { isDragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    const handleTitlebarMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        dragStart.current = {
            x: e.clientX - posRef.current.x,
            y: e.clientY - posRef.current.y,
        };
    };

    const openWindow = () => {
        setPosition({ x: 0, y: 0 });
        posRef.current = { x: 0, y: 0 };
        setIsOpen(true);
    };

    const currentTrack = TRACKS[currentIndex];

    const goToIndex = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, TRACKS.length - 1)));
    };

    const togglePlayPause = () => setIsPlaying(prev => !prev);

    const ToggleShuffle = () => {
        setIsShuffle(prev => !prev);
        setHistory([]);
    };

    const ToggleRepeat = () => {
        setRepeatMode(prev => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
        });
    };

    const handleNext = () => {
        if (repeatMode === 'one') { goToIndex(currentIndex); return; }
        if (isShuffle) {
            const total = TRACKS.length;
            if (total <= 1) return;
            let next = currentIndex;
            while (next === currentIndex) next = Math.floor(Math.random() * total);
            setHistory(h => [...h, currentIndex]);
            goToIndex(next);
            return;
        }
        const isLast = currentIndex === TRACKS.length - 1;
        if (isLast) {
            if (repeatMode === 'all') goToIndex(0);
            else setIsPlaying(false);
        } else {
            goToIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (isShuffle) {
            setHistory(h => {
                if (h.length === 0) return h;
                const copy = [...h];
                const prev = copy.pop() as number;
                goToIndex(prev);
                return copy;
            });
            return;
        }
        if (currentIndex === 0) {
            if (repeatMode === 'all') goToIndex(TRACKS.length - 1);
            else goToIndex(0);
        } else {
            goToIndex(currentIndex - 1);
        }
    };

    const handleEnded = () => handleNext();

    const handleSelectTrack = (id: number) => {
        const index = TRACKS.findIndex(t => t.id === id);
        if (index !== -1) { goToIndex(index); setIsPlaying(true); }
    };

    return (
        <>
            {/* Trigger — shown when window is closed */}
            {!isOpen && (
                <div className="app-trigger-wrapper">
                    <button className="app-trigger" onClick={openWindow} aria-label="Open Music Player">
                        <FaMusic size={30} />
                    </button>
                    <span className="app-trigger-label">Music Player</span>
                </div>
            )}

            {/* Floating window */}
            {isOpen && (
                <div
                    className="app-window"
                    style={{ transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` }}
                >
                    {/* Title bar */}
                    <div className="window-titlebar" onMouseDown={handleTitlebarMouseDown}>
                        <div className="window-controls">
                            <button
                                className="win-btn win-close"
                                onClick={() => setIsOpen(false)}
                                title="Close"
                            />
                            <button className="win-btn win-minimize" title="Minimize" />
                            <button className="win-btn win-maximize" title="Maximize" />
                        </div>
                        <div className="window-title">Music Player</div>
                    </div>

                    {/* Player content */}
                    <MusicPlayer
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        isShuffle={isShuffle}
                        isRepeat={repeatMode !== 'off'}
                        tracks={TRACKS}
                        currentIndex={currentIndex}
                        onEnded={handleEnded}
                        onTogglePlayPause={togglePlayPause}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onToggleShuffle={ToggleShuffle}
                        onToggleRepeat={ToggleRepeat}
                        onSelectTrack={handleSelectTrack}
                    />
                </div>
            )}
        </>
    );
};

export default App1;
