import React, { useRef, useState } from "react";

function App() {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [songs, setSongs] = useState([
    { name: "Emperors Heist", artist: "Brand X Music-Topic", path: "./musics/Emperors-Heist.m4a", art: "./images/artwork.jpg" },
    { name: "The-Way-of-Honour", artist: "Marcus Warner", path: "./musics/Marcus-Warner-The-Way-of-Honour.m4a", art: "./images/artwork2.jpg" },
    { name: "Forgotten-Dynasty", artist: "J-T-Peterson", path: "./musics/Most-Epic-Music-A-Forgotten-Dynasty-by-J-T-Peterson.m4a", art: "./images/artwork3.jpg" },
  ])

  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const play = () => {
    audioRef.current.play();
  }

  const pause = () => {
    audioRef.current.pause();
  };

  const toPrevTrack = () => {
    if (selectedTrack - 1 < 0) {
      setSelectedTrack(songs.length - 1);
      audioRef.current.load();
      audioRef.current.play();
    }

    else {
      setSelectedTrack(selectedTrack - 1);
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const toNextTrack = () => {
    if (selectedTrack < songs.length - 1) {
      setSelectedTrack(selectedTrack + 1);
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const onPlaying = () => {
    setCurrentTime(audioRef.current.currentTime);
    setSeekValue(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    )

    if (audioRef.current.ended) {
      toNextTrack()
      audioRef.current.play();
      if (selectedTrack === 2) {
        audioRef.current.pause();
      }
    }
  };

  const convert = (n) => {
    let minutes = Math.floor(n / 60);
    let seconds = Math.floor(n - (minutes * 60));
    return minutes + " minutes " + seconds + " seconds";
  }

  return (
    <div className="App">
      <img className="App-image" src={songs[selectedTrack].art} alt="art" />
      <audio
        ref={audioRef}
        onTimeUpdate={onPlaying}
        onLoadedMetadata={() => { setDuration(audioRef.current.duration) }}>
        <source src={songs[selectedTrack].path} type="audio/mpeg" />
      </audio>

      <input className="App-progress"
        type="range"
        min="0"
        max="100"
        step="1"
        value={seekValue}
        onChange={(e) => {
          const seekto = audioRef.current.duration * (e.target.value / 100);
          audioRef.current.currentTime = seekto;
          setSeekValue(e.target.value);
        }}
      />

      <p className="App-title">{songs[selectedTrack].name} <strong> by artist </strong> {songs[selectedTrack].artist}</p>
      <p> {convert(duration)}</p>

      <div className="buttons">
        <button className="App-button" onClick={play}>Play</button>
        <button className="App-button" onClick={pause}>Pause</button>
        <button className="App-button" onClick={toPrevTrack}>Prev Click</button>
        <button className="App-button" onClick={toNextTrack}>Next Click</button>
      </div>
      <a className="App-link" href={songs[selectedTrack].path} download={songs[selectedTrack].path}>Download</a>
    </div>
  );
}

export default App;
