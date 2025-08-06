const clientId = '8f176e1113824d73ac9dd3385b55048b'; // Reemplaza con tu Client ID de Spotify
const redirectUri = 'http://127.0.0.1:5173/callback'; // Debe coincidir con el de tu app en Spotify Dashboard
const apiUrl = 'https://api.spotify.com/v1';
let accessToken;

const Spotify = {
    getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log('Access Token:', accessToken);
        console.log('Search URL:', `${apiUrl}/search?type=track&q=${term}`);
        return fetch(`${apiUrl}/search?type=track&q=${term}`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !Array.isArray(trackUris) || trackUris.length === 0) {
            console.error('Invalid playlist name or track URIs');
            return Promise.reject(new Error('Invalid playlist name or track URIs'));
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        return fetch(`${apiUrl}/me`, {headers})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(jsonResponse => {
                const userId = jsonResponse.id;
                return fetch(`${apiUrl}/users/${userId}/playlists`, {headers, method: 'POST', body: JSON.stringify({name})});
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create playlist');
                }
                return response.json();
            })
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`${apiUrl}/playlists/${playlistId}/tracks`, {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            })
            .catch(error => {
                console.error('Error saving playlist:', error);
                return Promise.reject(error);
            });
    }
}


export default Spotify;