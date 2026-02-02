import React from 'react';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
    const formatTime = (time: number) => {
        if (!Number.isFinite(time) || time < 0) return "0:00";//
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
    const safeCurrentTime = Number.isFinite(currentTime) && currentTime >= 0 //
        ? Math.min(currentTime, safeDuration || currentTime)
        : 0; //

    return (
        <div className="progress-container" style={{ width: '100%', padding: '10px 0' }}>
            <div className="time-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{formatTime(safeCurrentTime)}</span>
                <span>{formatTime(safeDuration)}</span>
            </div>

            <input
                type="range"
                min={0}
                max={safeDuration}
                value={safeCurrentTime}
                step={0.1}
                onChange={(e) => onSeek(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
                aria-label="Seek"
            />
        </div>
    );
};

export default ProgressBar;