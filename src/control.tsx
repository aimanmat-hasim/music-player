import React from 'react';
import {
    FaPlay, FaPause, FaStepForward, FaStepBackward
} from "react-icons/fa";

interface ControlsProps {
    isPlaying: boolean;
    onTogglePlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    isPlaying,
    onTogglePlayPause,
    onNext,
    onPrevious,
}) => {
    return (
        <div className="controls-container" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

            {/* Previous Button */}
            <button type="button" onClick={onPrevious} aria-label="Previous">
                <FaStepBackward />
            </button>

            {/* Play/Pause Button */}
            <button
                type="button"
                onClick={onTogglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="main-play-btn"
            >
                {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </button>

            {/* Next Button */}
            <button type="button" onClick={onNext} aria-label="Next">
                <FaStepForward />
            </button>
        </div>
    );
};
export default Controls;