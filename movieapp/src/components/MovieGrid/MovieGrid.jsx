import React from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from '../MovieCard/MovieCard'

const MovieGrid = (props) => {
    return (
        <Grid style={{padding:"1rem"}} container spacing={{ xs:4, sm:4, md:6 }} direction="row" justifyContent="center" alignItems="center">
            {props.movieList.map(movie => 
                { if (movie['poster_path'] == null) {
                    return
                } else {
                    return (<MovieCard key={movie['id']} name={movie['original_title']} id={movie['id']} poster={movie['poster_path']} rating={movie['vote_average']}/>)
                }})
            }
        </Grid>
    );
}

export default MovieGrid