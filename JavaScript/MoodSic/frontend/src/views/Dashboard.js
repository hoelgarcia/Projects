import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';



const Dashboard = (props) => {
    const CLIENT_ID = "90d2672395aa46a4922c1d5819680697"
    const REDIRECT_URI = "http://localhost:3000/dashboard"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const history = useHistory();
    
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
        history.push("/dashboard");
    }, [])
    
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        history.push("/");
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
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/dashboard">MoodSic</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/dashboard">Home</a>
                </li>

                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

                </form>
            </div>
            </nav>

        {renderArtists()}
        {renderAlbums()}
        </div>
    );
};

export default Dashboard;