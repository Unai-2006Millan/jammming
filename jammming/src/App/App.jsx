import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../Searchresults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {search, savePlaylist} from '../Spotify/Spotify';

function App() {
  const [nameTrack, setNameTrack] = useState('');
  function handleSearchChange(event) {
    setNameTrack(event.target.value);
  }
  return (
    <>
      <h1>Jammming</h1>
      <SearchBar search={search} value={nameTrack} onChange={handleSearchChange} />
      <SearchResults />
      <Playlist savePlaylist={savePlaylist} />

    </>
  )
}

export default App
