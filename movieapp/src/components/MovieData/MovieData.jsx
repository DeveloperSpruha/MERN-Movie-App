import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarDay, faStopwatch, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import Axios from 'axios'
import './MovieData.css';
import Reviews from '../Reviews/Reviews';
import swal from 'sweetalert';

const MovieData = (props) => {
    const [watchlist, setWatchlist] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [castDetails, setCastDetails] = useState([]);
    const [inWatchlist, setInWatchlist] = useState();
    let { id } = useParams();
    let posterPath = "https://image.tmdb.org/t/p/original";
    const apiKey = "bb3130db877cd41b03464f90f3baa7e5";
    const movieQuery = "https://api.themoviedb.org/3/movie/"+ id + "?api_key=" + apiKey + "&language=en-US"
    const castQuery = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + apiKey + "&language=en-US"
    let margins = {margin:'2rem 0rem'}
    let castDeets = []

    const moviesFunction = async () => {
        try {
        const data = await Axios.get(movieQuery).then((res) => {
            // console.log(res.data)
            setMovieDetails(res.data);
        });
        checkIfAdded()
        } catch (e) {
        console.log(e);
        }
    };

    const castFunction = async () => {
        try {
            const data = await Axios.get(castQuery).then((res) => {
            // console.log(res.data['cast'])
            for (let i = 0; i < 8; i++){
                castDeets.push(res.data['cast'][i])
            }
            setCastDetails(castDeets);
        });
        } catch (e) {
        console.log(e);
        }
    };

    const handleWatchlist = () => {
        if (props.auth){
            Axios.post("https://movie-app-with-mern.herokuapp.com/addMovie/" + `${props.user}/`, movieDetails)
            setInWatchlist(true)
        } else {
            swal("Please sign in to add movies to your watchlist.","", "warning")
        }
    }

    const removeFromWatchlist = () => {
        if (props.auth) {
            Axios.post("https://movie-app-with-mern.herokuapp.com/deleteMovie/" + `${props.user}/`, movieDetails)
            setInWatchlist(false)
        }
    }

    const getWatchlist = async () => {
        if (props.auth) {
            await Axios.get("https://movie-app-with-mern.herokuapp.com/getWatchlist/" + `${props.user}/`).then((res) => {
                setWatchlist(res.data)
            });
        }
    }

    const checkIfAdded = async () => {
        if (watchlist.some(movie => movie.id === movieDetails['id'])){
            setInWatchlist(true)
        } else {
            setInWatchlist(false)
        }
    };

    useEffect(() => {
        moviesFunction()
        castFunction()
        getWatchlist()
    }, [])

    useEffect(() => {
        checkIfAdded()
    }, [watchlist])

    return (
        <>
        <Grid container justifyContent='center'>
            <Grid item xs={12} sm={12} md={6}>
                <img style={{maxWidth:'100%'}} src={posterPath + movieDetails['backdrop_path']} alt="" />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div style={{padding:'2rem'}}>
                    <div style={margins} className="movieTitle">
                        <h1 style={{marginBottom:"1rem", textAlign:"center",fontSize:"2.5rem"}}>{movieDetails['original_title']}</h1>
                        <p class="tagline">{movieDetails['tagline']}</p>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', textAlign:'center', margin:'2rem 0rem'}} className="movieDetails">
                        <p style={{margin:"10px"}}>
                            <FontAwesomeIcon style={{color:"yellow"}} className="icon" icon={faStar} />
                            {movieDetails['vote_average']}
                        </p>
                        <p style={{margin:"10px"}}>
                            <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                            {movieDetails['release_date']}
                        </p>
                        <p style={{margin:"10px"}}>
                            <FontAwesomeIcon className="icon" icon={faStopwatch} />
                            {movieDetails['runtime']} mins
                        </p>
                        <p style={{margin:"10px"}}>
                            <FontAwesomeIcon className="icon" icon={faLanguage} />
                            {movieDetails['original_language']}
                        </p>
                    </div>
                    <div className="movieText" style={{padding:"1rem"}}>
                        <p style={{lineHeight:"24px"}}>{movieDetails['overview']}</p>
                    </div>
                </div>
                <div style={{textAlign:"center"}} className="addToWatchlist">
                        {inWatchlist ? <button className="addBtn" onClick={removeFromWatchlist} style={{ backgroundColor: 'red', color: 'white' }}>Remove from watchlist</button> : <button className="addBtn" onClick={handleWatchlist}>Add to Watchlist</button>}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={9} style={{margin:'1.5rem'}}>
                <div style={{padding:'2rem'}}>
                    <h1 class="castTitle">CAST</h1>
                </div>
                <Grid container spacing={{ xs:4, sm:4, md:6 }} justifyContent="center" className="castMembers">
                    {castDetails.map(castMember => {
                        if (!castMember['profile_path']){
                            return
                        } else {
                            return (
                                <Grid item xs={6} sm={3} md={2}>
                                    <div>
                                        <img style={{maxWidth:'100%', borderRadius:"25px"}} src={posterPath + castMember['profile_path']}></img>
                                    </div>
                                    <div>
                                        <p className="actorName" align="center">{castMember['original_name']}</p>
                                        <p className="charName" align="center">{castMember['character']}</p>
                                    </div>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Grid>
            <Reviews movieID={id} auth={props.auth} user={props.user} />
        </Grid>
        </>
    )
}

export default MovieData