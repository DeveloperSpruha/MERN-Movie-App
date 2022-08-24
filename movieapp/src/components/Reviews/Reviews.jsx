import React, {useState, useEffect} from 'react'
import './Reviews.css'
import { Grid } from '@mui/material'
import Review from '../Review/Review'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reviews = (props) => {
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [length, setLength] = useState(0)

    const getAllReviews = async () => {
      let response = await axios.get("https://movie-app-with-mern.herokuapp.com/getReviews/" + `${props.movieID}/`).then((res) => {
        setAllReviews(res.data)
        setLength(res.data.length)
      })
    }

    const handleReviewChange = (e) => {
        let value = e.target.value
        setReview(value)
    }

    const handleReview = async (e) => {
      e.preventDefault()
      if (props.auth) {
        axios.post('https://movie-app-with-mern.herokuapp.com/sendReview/', {'movieID': props.movieID, 'review': review, 'likes': [], 'username': props.user}).then((res) => {
          getAllReviews()
        })
      }
      setReview('')
    }

    useEffect(() => {
      getAllReviews()
    }, [])

  return (
        <Grid className="ReviewSection" container direction="column" justifyContent="center" alignItems="center">
          <div>
              <h1 style={{marginBottom:"2rem"}}>REVIEWS</h1>
          </div>
          <Grid container justifyContent="center" alignItems="center">
            {(length != 0) ? allReviews.map(review => {
              return (<Review auth={props.auth} user={props.user} object={review} username={review['username']} likes={review['likes']} review={review['review']} getAllReviews={getAllReviews}/>)
            }) : <h4>Be the first to add a review.</h4>}
          </Grid>
          {/* Write a review */}
        {props.auth ? 
            <form style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: "center" }}>
                <textarea value={review} onChange={e => handleReviewChange(e)} type="textarea" style={{ backgroundColor: 'rgba(128, 128, 128, 0.219)', color: "white", width:'100%', maxWidth: "400px", height: "200px", borderRadius: '25px', border: '0.5px solid green', padding: '1rem', margin: '1rem' }} placeholder="Write a review.." required></textarea>
                <button onClick={e => handleReview(e)} className="addBtn" type="submit">Submit</button>
            </form> 
          : 
            <Link style={{ margin: "1.5rem" }} to="/login"><h3><span style={{color:"green"}}>Log in</span> to add a review.</h3></Link>}
          
        </Grid>
  )
}

export default Reviews