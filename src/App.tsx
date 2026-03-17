import React, {useEffect, useRef} from 'react';
import Controls from "./control";
import MusicPlayer from "./musicplayer";

// Define the Track type (so TS knows the object shape)
type Track = {
    id: number;
    title: string;
    artist: string;
    src: string;
};

// Static list of tracks (data, not state)

const TRACKS: Track[] = [
    { id: 1, title: 'Lautan', artist: 'Yuna', src: "/assets/songs/lautan.mp3" },
    { id: 2, title: 'Akad', artist: 'Payung Teduh', src: "/assets/songs/akad.mp3" },
    { id: 3, title: 'Sency', artist: 'dia & Tenxi', src: "/assets/songs/sency.mp3" },
    { id: 4, title: 'Bunga Di Telinga', artist: 'Noh Salleh', src: "/assets/songs/bunga-di-telinga.mp3" },
    { id: 5, title: 'Sempurna', artist: 'Insomniacs', src: "/assets/songs/sempurna.mp3" },
];

// spotify-like repeat modes 
type RepeatMode = 'off' | 'one' | 'all';

const App1: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    //Spotify-like toggles
    const [isShuffle, setIsShuffle] = useState<boolean>(false);
    const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

    //For shuffle "Prev" behavior (go back to previously played random tracks)
    const [history, setHistory] = useState<number[]>([]);
    //take note history 

    const currentTrack = TRACKS[currentIndex];

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const ToggleShuffle = () => {
        setIsShuffle((prev) => !prev);
        setHistory([]);
        //optional: clears shuffle history when toggling
    };

    // Repeat cycle : off -> all -> one -> off 
    const ToggleRepeat = () => {
        setRepeatMode((prev) => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
        });
    };

    const handleNext = () => {
        // Repeat-one: keep same song (Spotify-like feel)
        if (repeatMode === 'one') {
            goToIndex(currentIndex);
            return;
        }

        //Shuffle
        if (isShuffle) {
            const total = TRACKS.length;

            // if only 1 track, no need random 
            if (total <= 1) return;
            //why return at the back 

            let next = currentIndex;
            while (next === currentIndex) {
                next = Math.floor(Math.random() * total);
            }
            //take look for math 

            setHistory((h) => [...h, currentIndex]);//what do you mean...h 
            goToIndex(next);
            return;
        }

        //Normal order 
        const isLast = currentIndex === TRACKS.length - 1;// need to take note here 
        if (isLast) {
            if (repeatMode === 'all') {
                goToIndex(0); //loop to start
            }else{
                setIsPlaying(false); //stop playing at the end
            }
        }else{
            goToIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        // In Spotify, "restrat if ?3s" needs currentTime from audio,
        // so we keep App's prev as "navigation only"
        // simplify this term 

        if (isShuffle){
            setHistory((h) => {
                if (h.length === 0) return h;
                const copy = [...h];
                const prevIndex = copy.pop() as number;
                goToIndex(prevIndex);
                return copy;
            });
            return;//why double return 
        }

        const isFirst = currentIndex === 0;
        if (isFirst) {
            if (repeatMode ==='all') {
                goToIndex(TRACKS.length - 1);
            }else{
                goToIndex(0);
            }
        }else{
            goToIndex(currentIndex - 1);
        }
    };

    //When audio ends naturally 
    const handleEnded = () => {
        if (repeatMode === 'one') {
            // MusicPlayer will restart when we keep same index + isPlaying true,
            // but simplest is: call next logic and it will stay on same song.
            handleNext();
            return;
        }

        handleNext();
    };

    return (
        <div className="app">
            <MusicPlayer currentTrack={currentTrack} isPlaying={isPlaying} onEnded={handleEnded} />

            <Controls
                isPlaying={isPlaying}
                isShuffle={isShuffle}
                isRepeat={repeatMode !== 'off'}// for now, green when any repeat is on 
                onTogglePlayPause={togglePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onToggleShuffle={ToggleShuffle}
                onToggleRepeat={ToggleRepeat}
            />

            {/* Optional debug (remove later)*/}
            {/* <pre style={{ color: 'white' }}>
                {JSON.stringify({ currentIndex, isPlaying, isShuffle, repeatMode, history }, null, 2)}
            </pre> */}   
        </div>
    );
};

export default App1;