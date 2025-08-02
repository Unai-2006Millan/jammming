import React from 'react';
import './Playlist.css';



function Playlist(props) {
    return(
        <div className='Playlist'>
            <input defaultValue="New Playlist" />
            <button onClick={props.savePlaylist} className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}



export default Playlist;
