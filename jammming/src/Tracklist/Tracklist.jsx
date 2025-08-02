import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist(props) {
    if (!props.tracks || props.tracks.length === 0) {
        return <div className="Tracklist">No tracks available</div>;
    }
    if (props.isRemoval) {
        return (
            <div className="Tracklist">
                {props.tracks.map(track => (
                    <Track key={track.id} track={track} onRemove={props.onRemove} isRemoval={props.isRemoval} />
                ))}
            </div>
        );
    }

    return (
        <div className="Tracklist">
            {props.tracks.map(track => (
                <Track key={track.id} track={track} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval} />
            ))}
        </div>
    );
}

export default Tracklist;