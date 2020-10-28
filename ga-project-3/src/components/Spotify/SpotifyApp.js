import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import Axios from 'axios';


export default function SpotifyApp(props) {

    // Setting initial states and methods to change them
    const [token, setToken] = useState('');
    const [genres, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });

    useEffect(() => {
        // API call to get authorization token
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
                // Once token is acquired, pass token into header to make API call for genres 
                Axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                })
                    // Take the response and set the state above with the array of
                    // genres found. The unshift is used to add a starting point for
                    //  a better UI.
                    .then(genreResponse => {
                        let newArry = genreResponse.data.categories.items;
                        newArry.unshift({ name: 'Select Genre' })
                        setGenre({
                            selectedGenre: genres.selectedGenre,
                            listOfGenresFromAPI: newArry
                        });
                    })


            })
        //Added 3 dependencies to useEffect to run the code again if any item
        //changes. Mainly, for genres.
    }, [genres.selectedGenre, process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET])

    //Method for finding the selected genre when the dropdown item is selected.
    // val is equal to the id of the genre, not the name visible on the list.
    // The id is found/assigned via the dropdown component.
    const genreChanged = (val) => {
        setGenre({
            selectedGenre: val,
            listOfGenresFromAPI: genres.listOfGenresFromAPI
        });

        //API call for finding the first 10 playlists of the selected genre
        Axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            //Take the response and set the state above with the array of
            // playlists found. The unshift is used to add a starting point for
            //  a better UI.
            .then(playlistResponse => {
                let newArry = playlistResponse.data.playlists.items;
                newArry.unshift({ name: 'Select Playlist' })
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: newArry
                })

            })

    }
    //Method for pulling tracks of the selected playlist.
    // val is equal to the id of the playlist, not the name visible on the list.
    // The id is found/assigned via the dropdown component.
    const playlistChanged = val => {
        let time = 0;
        Axios(`https://api.spotify.com/v1/playlists/${val}/tracks`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        //Used to find the duration of the playlist. Adding each song's durations
            .then(playlistInfo => {
                playlistInfo.data.items.map((song, id) => {
                    time += parseInt(song.track.duration_ms)
                })
                props.updatePlaylistTime((time / (1000 * 3600)).toFixed(1));
            })
        //Updating state for selected playlist and lists of playlists
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        })
    };


    return (
        <div className="music-player">
            <div className="playlist-select">
                {/* The first dropdown is used for genres. The second for playlists. Passing the array of data from the api call as options
                an on-change function is aslo passed in each dropdown.*/}
                <DropDown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                <DropDown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
                <p className="buttons" 
                    onClick={(selectedGenre) => props.nightMode(genres.selectedGenre)}>
                    {props.currentMap>0?
                    "Normal Mode":"Night Mode"
                    }
                </p>
            </div>
            {
                playlist.selectedPlaylist ?
                // iframe was used from spotify's widget code. 
                // All that was needed was the playlist id. 
                // The id is supplied everytime the playlist is changed.
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
