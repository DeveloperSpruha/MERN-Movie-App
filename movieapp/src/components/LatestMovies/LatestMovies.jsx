import React from 'react'
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';

const LatestMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiKey = "bb3130db877cd41b03464f90f3baa7e5";
    const query = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US&page=1"

    const moviesFunction = async () => {
        try{
            const data = await axios
            .get(query)
            .then(res => {
                // console.log(res.data['results'])
                setMovies(res.data['results'])
            });
            setLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        moviesFunction()
    }, []);

    return (
    <>
        <h1 style={{margin:'2rem', textAlign:"center"}}>Latest Movies</h1>
        {loading ? <CircularProgress style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}} /> : <MovieGrid movieList={movies} />}
    </>
    );
}

export default LatestMovies