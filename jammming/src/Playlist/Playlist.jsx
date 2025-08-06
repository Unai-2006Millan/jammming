import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import { useCallback } from 'react';



function Playlist(props) {
    const handleNameChange = useCallback(
        (event) => {
          props.onNameChange(event.target.value);
        },
        [props.onNameChange]
    );

    return(
        <div className='Playlist'>
            <input onChange={handleNameChange} defaultValue="New Playlist" />
            <TrackList
                    tracks={props.playlistTracks}
                    isRemoval={true}
                    onRemove={props.onRemove}
            />
            <button onClick={props.savePlaylist} className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}



export default Playlist;
