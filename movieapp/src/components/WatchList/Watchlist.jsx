import React, { useState, useEffect } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WatchList = (props) => {
    const [watchlist, setWatchlist] = useState([]);
    const [length, setLength] = useState(0)

    const watchlistFunction = async () => {
        if (props.auth){
            const data = await axios.get('https://movie-app-with-mern.herokuapp.com/getWatchlist/' + `${props.user}/`).then((res) => {
                setWatchlist(res.data)
                setLength(res.data.length)
            })
        }
    };

    useEffect(() => {
        watchlistFunction()
    }, [])

    return (
    <> 
        <h1 style={{margin:'2rem', textAlign:"center"}}>My Watchlist</h1>
        {!props.auth ? <h3 style={{ textAlign: 'center' }}>Please <Link style={{ color: 'green' }} to="/login">login</Link> to view your watchlist.</h3>
            : (length != 0) ? <MovieGrid movieList={watchlist} />
                : <h3 style={{ textAlign: 'center' }}>Your watchlist is empty.</h3>}
    </>
    )
}
export default WatchList;

// { loading ? <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} /> : <MovieGrid movieList={watchlist} /> }