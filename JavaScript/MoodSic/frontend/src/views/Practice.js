<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<a class="navbar-brand" href="/dashboard">MoodSic</a>
<div class="nav navbar-nav navbar-right">
        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : null}
        {token ?
        <form onSubmit={searchAlbums}>
            <input class="form-control mr-sm-2" type="text" placeholder="Album Name" onChange={e => setSearchKeyAlbums(e.target.value)}/>
            <button class="btn btn-outline-success my-2 my-sm-0" type={"submit"}>Search Albums</button>
        </form > 
            : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
        }
        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : null}
        {token ?
        <form onSubmit={searchArtists}>
            <input class="form-control mr-sm-2" type="text" placeholder="Artist Name" onChange={e => setSearchKeyArtists(e.target.value)}/>
            <button class="btn btn-outline-success my-2 my-sm-0"  type={"submit"}>Search Artists</button>
        </form>
            : <p>In order to gain access to the Spotify API, you must first authorize/verify your Spotify account by logging in.</p>
        }
</div>
</nav>




<div class="container">
<div class="row g-2">
    <div class="col-6">
        <div className="p-3 border bg-1">
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
        </div>
    </div>
    <div class="col-6">
        <div className="p-3 border bg-1">
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
        </div>
    </div>
    <div class="col-6">
        <div class="p-3 border bg-1">{renderArtists()}</div>
    </div>
    <div class="col-6">
        <div class="p-3 border bg-1">{renderAlbums()}</div>
    </div>
    </div>
</div>