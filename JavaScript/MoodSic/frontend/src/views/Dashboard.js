import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
        history.push("/");
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
            <div className="p-3 border bg-1" key={album.id}>
                {album.images.length ? <img width={"200px"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                <br />
                <p><a href={album.uri}>View on Spotify</a></p>
                <p>Album Name: {album.name}</p>
                <p>Artist: {album.artists[0].name}</p>
                <p>Total Tracks On Album: {album.total_tracks}</p>
                <p>Album Release Date: {album.release_date}</p>
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
                {artist.images.length ? <img width={"200px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                <br />
                <p><a href={artist.uri}>View on Spotify</a></p>
                <p>{artist.name}</p>
                <p>Popularity: {artist.popularity}/100</p> 
                <p className="d-inline-block text-truncate" style={{maxWidth: "200px"}}>Genres: {artist.genres[0]}, {artist.genres[1]}, {artist.genres[2]}</p>
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
    const renderTracks = () => {
        return tracks.map(track =>(
            <div className="p-3 border bg-1" key={track.id}>
                {track.album.images.length ? <img width={"200px"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
                <br />
                <p>Song: {track.name}</p>
                <p>Album: {track.album.name}</p>
            </div>
        ))
    }






    return (
        <div>
            <nav className="navbar navbar-light bg-dark">
            <form className="form-inline d-flex ">
                <button className="btn btn-outline-danger justify-content-end" type="button" onClick={logout}>Log Out of Spotify</button>
            </form>
            </nav>
        <div className="row g-2 ">
            <div className="col-4 d-flex justify-content-center">
                <div className="p-3 border bg-1">
                    {token ?
                    <form onSubmit={searchAlbums}>
                        <input className="w-75 mr-sm-2" type="text" placeholder="Album Name" onChange={e => setSearchKeyAlbums(e.target.value)}/>
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
                        <input className="w-75 mr-sm-2" type="text" placeholder="Artist Name" onChange={e => setSearchKeyArtists(e.target.value)}/>
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
                        <input className="w-75 mr-sm-2" type="text" placeholder="Song Name" onChange={e => setSearchKeyTracks(e.target.value)}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type={"submit"}>Search Songs</button>
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