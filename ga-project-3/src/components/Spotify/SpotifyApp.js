import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import ListTracks from './ListTracks';
import Detail from './Detail';
import { Credentials } from './Credentials';
import Axios from 'axios';

export default function SpotifyApp() {

    const spotify = Credentials();

    console.log('RENDERING APP.JS');

    const data = [
        { value: 1, name: 'A' },
        { value: 2, name: 'B' },
        { value: 3, name: 'C' }
    ]
// Setting initial states and methods to change them
    const [token, setToken] = useState('');
    const [genres, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
    const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []})
    const [trackDetail, setTrackDetail] = useState(null)

    useEffect(() => {
        Axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
            .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);

                Axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                })
                    .then(genreResponse => {
                        setGenre({
                            selectedGenre: genres.selectedGenre,
                            listOfGenresFromAPI: genreResponse.data.categories.items
                        });
                    })


            })

    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret])

    const genreChanged = (val) => {
        setGenre({
            selectedGenre: val,
            listOfGenresFromAPI: genres.listOfGenresFromAPI
        });

        Axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(playlistResponse => {
                console.log(playlistResponse.data.playlists)
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: playlistResponse.data.playlists.items
                })
            })
            console.log(val);
    }

    const playlistChanged = val => {
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        })
    };
// List tracks and porforms api call when button clicked
    const buttonClicked = (e) => {
        e.preventDefault();

        Axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
            method: 'GET',
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          })
          .then(tracksResponse => {
              console.log(tracksResponse.data.items)
            setTracks({
              selectedTrack: tracks.selectedTrack,
              listOfTracksFromAPI: tracksResponse.data.items
            })
          });
        }

        //id of button is also id of the track. Then use the filter method to
        //see where the track ID is equal to the button ID. Then store track
        //info in trackDetail state.
        const listboxClicked = val => {

            const currentTracks = [...tracks.listOfTracksFromAPI];
            const trackInfo = currentTracks.filter(t => t.track.id === val);
        
            setTrackDetail(trackInfo[0].track);
          }
      

    return (
        <form onSubmit={buttonClicked}>
            <div>
                <DropDown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                <DropDown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
                <button type='submit'>
                    Button
                </button>
            </div>
            <div>
                <ListTracks items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
                {trackDetail && <Detail {...trackDetail} /> }
            </div>
        </form>

    )
}
