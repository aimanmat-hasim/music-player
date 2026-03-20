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
        <div className="controls">

            {/* Previous Button */}
            <button type="button" onClick={onPrevious} aria-label="Previous" className="ctrl-btn prev">
                <FaStepBackward />
            </button>

            {/* Play/Pause Button */}
            <button
                type="button"
                onClick={onTogglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="ctrl-btn play"
            >
                {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
            </button>

            {/* Next Button */}
            <button type="button" onClick={onNext} aria-label="Next" className="ctrl-btn next">
                <FaStepForward />
            </button>
        </div>
    );
};
export default Controls;