import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import Axios from 'axios';

// require('dotenv').config();

export default function SpotifyApp(props) {



// Setting initial states and methods to change them
    const [token, setToken] = useState('');
    const [genres, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });


    useEffect(() => {
        Axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
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
                        let newArry = genreResponse.data.categories.items;
                        newArry.unshift({name: 'Select Genre'})
                        setGenre({
                            selectedGenre: genres.selectedGenre,
                            listOfGenresFromAPI: newArry
                        });
                    })


            })

    }, [genres.selectedGenre, process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET])

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
                let newArry = playlistResponse.data.playlists.items;
                newArry.unshift({name: 'Select Playlist'})
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: newArry
                })
                
            })
            
    }

    const playlistChanged = val => {
        let time = 0;
        Axios(`https://api.spotify.com/v1/playlists/${val}/tracks`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(playlistInfo => {
                console.log(playlistInfo.data.items)
                playlistInfo.data.items.map((song, id) => {
                    time += parseInt(song.track.duration_ms)
                })
                props.updatePlaylistTime((time/(1000*3600)).toFixed(1));
            })
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        })
    };
  

    return (
        <div className="music-player">
            <div className="playlist-select">
                <DropDown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                <DropDown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
                <p className="buttons" onClick={(selectedGenre) => props.nightMode(genres.selectedGenre)}>{props.currentMap>0?"Normal Mode":"Night Mode"}</p>
            </div>
            {
                playlist.selectedPlaylist ? 
                    <iframe 
                        src={'https://open.spotify.com/embed/playlist/' + playlist.selectedPlaylist}
                        allowtransparency="true" 
                        allow="encrypted-media">
                    </iframe> 
                    : 
                    null
            }
        </div>

    )
}
