import React from 'react';
import {
    FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo
} from "react-icons/fa";

interface ControlsProps {
    isPlaying: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    onTogglePlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onToggleShuffle: () => void;
    onToggleRepeat: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    isPlaying,
    isShuffle,
    isRepeat,
    onTogglePlayPause,
    onNext,
    onPrevious,
    onToggleShuffle,
    onToggleRepeat,
}) => {
    return (
        <div className="controls-container" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

            {/* Shuffle Button */}
            <button 
            type="button"
            onClick={onToggleShuffle}
            aria-label="Shuffle"//
            style={{ color: isShuffle ? '#1DB954' : 'white' }}>
                <FaRandom />
            </button>

            {/* Previous Button */}
            <button type="button" onClick={onPrevious} aria-label="Previous">
                <FaStepBackward />
            </button>
// Type button //
            {/*Play/Pause Button */}
            <button
            type="button"
            onClick={onTogglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="main-play-btn">
                {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </button>

            {/* Next Button */}
            <button type="button" onClick={onNext} aria-label="Next">
                <FaStepForward />
            </button>

            {/* Repeat Button */}
            <button 
            type="button"
            onClick={onToggleRepeat}
            aria-label="Repeat"
            style={{ color: isRepeat ? '#1DB954' : 'white' }}>
                <FaRedo />
            </button>
        </div>
    );
} ;
export default Controls;