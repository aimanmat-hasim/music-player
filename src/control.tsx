import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

interface ControlsProps {
    isPlaying: boolean;
    onTogglePlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, onTogglePlayPause, onNext, onPrevious }) => {
    return (
        <div className="mp-btn-group">
            <button type="button" onClick={onPrevious} aria-label="Previous" className="mp-btn">
                <FaStepBackward size={16} />
            </button>
            <button
                type="button"
                onClick={onTogglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="mp-btn play-main"
            >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>
            <button type="button" onClick={onNext} aria-label="Next" className="mp-btn">
                <FaStepForward size={16} />
            </button>
        </div>
    );
};

export default Controls;
