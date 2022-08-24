import React from 'react';
import Grid from '@mui/material/Grid';
import './movieCard.css'
import { Outlet, Link } from "react-router-dom";

const MovieCard = (props) => {
    let posterPath = "https://image.tmdb.org/t/p/original";
    let url = "/movie/" + `${props.id}`
    return (
        <Grid item className="GridItem" xs={6} sm={4} md={3}>
            <Link to={url}>
                <div style={{borderRadius:"25px",overflow:"hidden"}}>
                    <img style={{width:"100%"}}src={posterPath + props.poster} alt="" />
                </div>
            </Link>
            <Outlet />
        </Grid>
    )
}

export default MovieCard