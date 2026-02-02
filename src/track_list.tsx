import React from 'react';

type Track = {
    id: number;
    title: string;
    artist: string;
};

interface TrackListProps {
    songs: Track[];
    currentIndex: number;
    onSelectTrack: (id: number) => void;
}

const TrackList: React.FC<TrackListProps> = ({ songs, currentIndex, onSelectTrack }) => {
    return (
        <div
            className="tracklist-container"
            style={{ marginTop: '20px', borderTop: '1px solid #333' }}
        >
            <h4 style={{ color: '#b3b3b3', fontSize: '14px', margin: '10px 0' }}>Playlist</h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {songs.map((song, index) => {
                    const isActive = currentIndex === index;

                    return (
                        <li
                            key={song.id}
                            onClick={() => onSelectTrack(index)}
                            style={{
                                padding: "8px 10px",
                                cursor: "pointer",
                                backgroundColor: isActive ? "#282828" : "transparent",
                                color: isActive ? "#1DB954" : "white",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderRadius: "8px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold" }}>{song.title}</div>
                                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>{song.artist}</div>
                            </div>

                            {isActive && <span style={{ fontSize: "12px" }}>Playing</span>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default TrackList;