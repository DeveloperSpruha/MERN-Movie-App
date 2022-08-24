import React, { useState, useEffect } from 'react';
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import MovieGrid from "../MovieGrid/MovieGrid";
import './styles.css'

const Home = () => {
    const [search, setSearch] = useState("a")
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiKey = "bb3130db877cd41b03464f90f3baa7e5";
    const query = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + search + "&page=1&include_adult=false"

    let center = {justifyContent:"center", margin:"1rem 0rem 2rem 0rem", display:"flex"}

    const moviesFunction = async () => {
        try {
        const data = await axios.get(query).then((res) => {
            // console.log(res.data['results'])
            setMovies(res.data["results"]);
        });
        setLoading(false);
        } catch (e) {
        console.log(e);
        }
    };

    const handleChange = event => {
        let searchVal = event.target.value
        if (searchVal == ''){
            setSearch('a')
        } else {
            setSearch(searchVal);
        }
    }

    useEffect(() => {
        moviesFunction()
    }, [search]);

    return (
    <>
        <div className="title">
            <h1 className="homeTitle" style={{margin:'2rem'}}>Search Movies</h1>
        </div>
        <div style={center} className="input">
            <input
            placeholder='Search for any movie'
            id="movieInput" 
            defaultValue=""
            autoComplete='off'
            onChange={(event) => handleChange(event)}
            />
        </div>
        {loading ? <CircularProgress style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}} /> : <MovieGrid movieList={movies} />}
    </>
    )
}

export default Home