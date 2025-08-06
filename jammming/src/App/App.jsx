import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../Searchresults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../Spotify/Spotify';
import { useCallback } from 'react';

function App() {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [results, setResults] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setResults);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );



  const removeTrack = useCallback((track) => {
      setPlaylistTracks((prevTracks) =>
        prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);
  
  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);
  
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
    setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <>
      <header className='App-header'>
        <h1>Ja<span id='title'>mmm</span>ing</h1>
      </header>
      <section className="App">
        <SearchBar search={search} />
        <div className="App-playlist">
          <SearchResults tracks={results} onAdd={addTrack} />
          <Playlist savePlaylist={Spotify.savePlaylist} onRemove={removeTrack} playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </section>

    </>
  );
}

export default App;
