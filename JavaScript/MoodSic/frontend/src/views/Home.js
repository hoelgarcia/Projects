import React, {useEffect,useState} from "react";

const Home = (props) =>{

    const CLIENT_ID = "90d2672395aa46a4922c1d5819680697"
    const REDIRECT_URI = "http://localhost:3000/dashboard"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const [token, setToken] = useState("")

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
    const login = {
        margin: "25%", marginBottom: "0"
    }
    return(
        <div class="w-50 text-center" style={login}>
            <h4>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</h4>
                <a className="btn btn-success" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        </div>
    )
}

export default Home;


