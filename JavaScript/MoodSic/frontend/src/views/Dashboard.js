import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";

const Dashboard = (props) => {
    const CLIENT_ID = "90d2672395aa46a4922c1d5819680697"
    const REDIRECT_URI = "http://localhost:3000/dashboard"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    
    const [token, setToken] = useState("")
    const [searchKeyArtist, setSearchKeyArtists] = useState("")
    const [searchKeyAlbum, setSearchKeyAlbums] = useState("")
    const [searchKeyTrack, setSearchKeyTracks] = useState("")
    const history = useHistory();
    
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    
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
        history.push("");
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
    const renderAlbums = () => {
        return albums.map(album =>(
            <div className="p-3 border bg-1 d-flex row " key={album.id}>
                <div className="col">
                {album.images.length ? <img width={"225px"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                </div>
                <div className="col">
                <p>Album Name: {album.name}</p>
                <p>Artist: {album.artists[0].name}</p>
                <p>Total Songs: {album.total_tracks}</p>
                <p>Album Release Date: {dateFormat(album.release_date, "mmmm dS, yyyy")}</p>
                <p className="text-center"><a href={album.uri}>View {album.name} on Spotify</a></p>
                </div>
            </div>
        ))
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
    const renderArtists = () => {
        return artists.map(artist =>(
            <div  className="p-3 border bg-1" key={artist.id}>
                <div className="text-center">
                {artist.images.length ? <img width={"250px"} src={artist.images[0].url} alt=""/> : <div>No Image Available</div>}
                <p>{artist.name}</p>
                <p>Popularity: {artist.popularity}/100</p> 
                <p className="d-inline-block text-truncate" style={{maxWidth: "200px"}}>Genres: {artist.genres[0]}, {artist.genres[1]}</p>
                <p><a href={artist.uri}>View {artist.name} on Spotify</a></p>
                </div>
            </div>

        ))
    }
    const searchTracks = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKeyTrack,
                type: "track"
            }
        })
        setTracks(data.tracks.items)
    }
    // const msToMinutesAndSeconds = (ms) =>{
    //     var minutes = Math.floor(ms/60000);
    //     var seconds = ((ms/60000)/1000).toFixed(0);
    //     return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    // }
    const renderTracks = () => {
        return tracks.map(track =>(
            <div className="p-3 border bg-1" key={track.id}>
                <div className="row">
                    <div className="col">
                        {track.album.images.length ? <img width={"200px"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
                    </div>
                    <div className="col">
                        <p>Song: {track.name}</p>
                        <p>Artist: {track.artists[0].name}</p>
                        <p>Album: {track.album.name}</p>
                        {/* <p>Duration: .msToMinutesAndSeconds({track.duration_ms})</p> */}
                        <p>Explicit: {track.explicit == true ? <span>Yes</span> : <span>No</span>}</p>
                        <p>Popularity: {track.popularity}/100</p>
                    </div>
                </div>
                <div className="row mt-2">
                <audio className="bg-1" controls autoplay><source src={track.preview_url} type="audio/mpeg"/></audio>
                </div>
            </div>
        ))
    }






    return (
        <div>
            <nav class="navbar navbar-light bg-dark justify-content-between">
                <h1 class="font-weight-bold">MoodSic</h1>
                <form class="form-inline">
                    <button className="btn btn-outline-danger " type="button" onClick={logout}>Log Out of Spotify</button>
                </form>
            </nav>
        <div className="row g-2 ">
            <div className="col-4 d-flex justify-content-center">
                <div className="p-3 border bg-1">
                    {token ?
                    <form onSubmit={searchAlbums}>
                        <input className="w-100 mr-sm-2" type="text" placeholder="Album Name" onChange={e => setSearchKeyAlbums(e.target.value)}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type={"submit"}>Search Albums</button>
                    </form > 
                        : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
                    }
                    {!token ?
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                            to Spotify</a>
                        : null}
                </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
                <div className="p-3 border bg-1 ">
                    {token ?
                    <form onSubmit={searchArtists}>
                        <input className="w-100 mr-sm-2" type="text" placeholder="Artist Name" onChange={e => setSearchKeyArtists(e.target.value)}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type={"submit"}>Search Artists</button>
                    </form>
                        : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
                    }
                    {!token ?
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                            to Spotify</a>
                        : null}
                </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
                <div className="p-3 border bg-1">
                    {token ?
                    <form onSubmit={searchTracks}>
                        <input className="w-100 mr-sm-2" type="text" placeholder="Song Name" onChange={e => setSearchKeyTracks(e.target.value)}/>
                        <button className="btn btn-outline-success my-2 my-sm-0 " type={"submit"}>Search Songs</button>
                    </form>
                        : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
                    }
                    {!token ?
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                            to Spotify</a>
                        : null}
                </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
                <div>{renderAlbums()}</div>
                <br />
            </div>
            <div className="col-4 d-flex justify-content-center">
                <div>{renderArtists()}</div>
                <br />
            </div>
            <div className="col-4 d-flex justify-content-center">
                <div>{renderTracks()}</div>
                <br />
            </div>
            </div>
        </div>
    );
};

export default Dashboard;