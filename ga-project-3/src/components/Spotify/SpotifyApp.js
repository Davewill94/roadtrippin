import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
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

    const [token, setToken] = useState('');
    const [genres, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });

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
// List tracks when button clicked
    const buttonClicked = (e) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={() => { }}>
            <div>
                <DropDown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                <DropDown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
                <button type='submit'>
                    Button
                </button>
            </div>
        </form>

    )
}
