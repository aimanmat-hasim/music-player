import React from 'react';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
    const formatTime = (time: number) => {
        if (!Number.isFinite(time) || time < 0) return "0:00";//finite ensuring number or value is well define, such time , cant be negative , so it default valued 
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
    const safeCurrentTime = Number.isFinite(currentTime) && currentTime >= 0 //
        ? Math.min(currentTime, safeDuration || currentTime)
        : 0; //

    const percent = safeDuration > 0 ? (safeCurrentTime / safeDuration) * 100 : 0;

    return (
        <div className="progress-container">
            <input
                type="range"
                className="seek-bar"
                min={0}
                max={safeDuration}
                value={safeCurrentTime}
                step={0.1}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Seek"
                style={{ '--seek-pct': `${percent}%` } as React.CSSProperties}
            />
            <div className="time-info">
                <span>{formatTime(safeCurrentTime)}</span>
                <span>{formatTime(safeDuration)}</span>
            </div>
        </div>
    );
};

export default ProgressBar;