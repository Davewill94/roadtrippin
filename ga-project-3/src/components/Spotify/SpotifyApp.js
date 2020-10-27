import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import { Credentials } from './Credentials';
import Axios from 'axios';

export default function SpotifyApp() {

    const spotify = Credentials();


// Setting initial states and methods to change them
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
                console.log(playlistResponse.data.playlists.items)
                let newArry = playlistResponse.data.playlists.items;
                newArry.unshift({name: 'Select Playlist'})
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: newArry
                })
                
            })
            
    }

    const playlistChanged = val => {
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        })
    };
  

    return (
        <form>
            <div>
                <DropDown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                <DropDown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
            </div>
            {playlist.selectedPlaylist ? <iframe src={'https://open.spotify.com/embed/playlist/' + playlist.selectedPlaylist}
            allowtransparency="true" 
            allow="encrypted-media"></iframe> : null}
        </form>

    )
}