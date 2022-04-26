import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Home from './views/Home';
import {Switch,Route} from "react-router-dom";

function App() {
const CLIENT_ID = "90d2672395aa46a4922c1d5819680697"
const REDIRECT_URI = "http://localhost:3000/signin"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const [token, setToken] = useState("")
const [searchKeyArtist, setSearchKeyArtists] = useState("")
const [searchKeyAlbum, setSearchKeyAlbums] = useState("")

const [artists, setArtists] = useState([])
const [albums, setAlbums] = useState([])

useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKeyArtist,
            type: "artist"
        }
    })
    setArtists(data.artists.items)
}
const searchAlbums = async (e) =>{
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search",{
        headers:{
            Authorization: `Bearer ${token}`
        },
        params:{
            q: searchKeyAlbum,
            type: "album"
        }
    })
    setAlbums(data.albums.items)
}

const renderArtists = () => {
    return artists.map(artist =>(
        <div key={artist.id}>
                    {artist.images.length ? <img width={"100px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    <br />
                    <a href={artist.uri}>View {artist.name} on Spotify</a>
                    <br />
        </div>

    ))
}
const renderAlbums = () => {
    return albums.map(album =>(
        <div key={album.id}>
                    {album.images.length ? <img width={"100px"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                    <br />
                    <a href={album.uri}>View {album.name} on Spotify</a>
                    <br />
        </div>
    ))
}


return (
    <div >
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/signin">
                <SignIn/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>

        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : <button onClick={logout}>Logout of Spotify</button>}
        {token ?
        <form onSubmit={searchAlbums}>
            <input type="text" onChange={e => setSearchKeyAlbums(e.target.value)}/>
            <button type={"submit"}>Search Albums</button>
        </form > 
            : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
        }
                {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : <button onClick={logout}>Logout of Spotify</button>}
        {token ?

        <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKeyArtists(e.target.value)}/>
            <button type={"submit"}>Search Artists</button>
        </form>

            : null
        }

        {renderArtists()}


        {renderAlbums()}


        


    </div>

);
}

export default App;
