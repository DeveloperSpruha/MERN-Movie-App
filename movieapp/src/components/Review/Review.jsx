import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import swal from 'sweetalert';

const Review = (props) => {
    const [isLiked, setIsLiked] = useState(false)

    const getAllReviews = () => {
      props.getAllReviews()
    }

    const handleLike = async () => {
      if(props.auth){
        if (isLiked == true){
          await axios.post("https://movie-app-with-mern.herokuapp.com/unlike/" + `${props.user}/`, props.object).then((res) => {
            getAllReviews()
            setIsLiked(false)
          })
        } else if (isLiked == false){
          await axios.post('https://movie-app-with-mern.herokuapp.com/like/' + `${props.user}/`, props.object).then((res) => {
            getAllReviews()
            setIsLiked(true)
          })
        }
      } else {
        swal('Please login to like a review.','','warning') 
      }
    }

    const getLikeStatus = () => {
      if (props.likes.includes(props.user)) {
        setIsLiked(true)
      }
    }

    useEffect(() => {
      getLikeStatus()
    }, [props.likes])
  
    return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ backgroundColor:'rgba(128, 128, 128, 0.219)',borderRadius:'25px', border:'0.5px solid green', padding:'2rem 2rem 1rem 2rem', margin:'1rem'}}>
        <p>"{props.review}"</p>
        <div className="reviewDetails" style={{display:'flex', justifyContent:'space-between', alignItems:"center", marginTop:'1rem'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                {/* Like Button */}
            {!isLiked ? 
            <button onClick={handleLike} style={{ borderRadius: "50%", width: '50px', 'height': '50px', cursor: 'pointer', backgroundColor:"white", color:'black' }}><FontAwesomeIcon className="icon" icon={faThumbsUp} /></button> 
            : 
            <button onClick={handleLike} style={{ borderRadius: "50%", width: '50px', 'height': '50px', cursor: 'pointer', color:'white', backgroundColor:"green" }}><FontAwesomeIcon className="icon" icon={faThumbsUp} /></button> }
                {/* Likes Count */}
                <h4 style={{marginLeft:'10px'}}>{props.likes.length}</h4>
            </div>
            <h6 style={{ textAlign: 'right', marginTop: '1rem' }}>- {props.username}</h6>
        </div>
    </Grid>
  )
}

export default Review