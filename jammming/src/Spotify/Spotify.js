const apiKey = 'ed3d518357cb40329be4658ef3706500';
const apiUrl = 'https://api.spotify.com/v1';

const search = async(query) => {
    const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
        'Authorization': `Bearer ${apiKey}`
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.tracks.items;
};

const savePlaylist = async(name, trackUris) => {
    if (!name || !trackUris.length) {
        return;
    }
    const response = await fetch(`${apiUrl}/playlists`, {
        method: 'POST',
        headers: {
            method: 'POST',
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            public: false
        })
    });
    if (!response.ok) {
        throw new Error('Failed to create playlist');
    }
    const playlist = await response.json();
    const trackResponse = await fetch(`${apiUrl}/playlists/${playlist.id}/tracks`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: trackUris })
        }
    );
    if (!trackResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
    }
    return playlist;
};

export default {
    search,
    savePlaylist
};