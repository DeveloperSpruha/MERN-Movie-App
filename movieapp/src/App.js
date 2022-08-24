import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LatestMovies from "./components/LatestMovies/LatestMovies";
import WatchList from "./components/WatchList/Watchlist";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import MovieData from "./components/MovieData/MovieData";
import './appstyle.css'
import SignUp from "./components/SignUp/SignUp";
import Axios from "axios";
import swal from 'sweetalert';

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    setAuth(false);
    setUser(null);
  }

  const handleLogin = (username, password) => {
    Axios.post("https://movie-app-with-mern.herokuapp.com/loginAPI/", {
      username: username, password: password
    }).then((response) => {
      if (response['data'] === 'Incorrect credentials. Please try again.'){
        swal("Incorrect Credentials.", "Please try again.", "warning")
      } else {
        setAuth(true)
        setUser(username)
        swal("Succesfully logged in.", "" ,"success")
      }
    })
  }

  const handleSignup = (firstName, lastName, username, password) => {
    Axios.post("https://movie-app-with-mern.herokuapp.com/createUser/", {
      firstName, lastName, username, password
    }).then((response) => {
      if (response.data == 'Success'){
        swal("Account Created!", "Please login to continue.", "success").then((res) => {
        window.location.href = "/login/";
      });
      } else {
        swal("Invalid Username.", "This username already exists.", "warning")
      }
    })
  }

  return (
    <BrowserRouter>
      <Navbar handleSignOut={handleSignOut} auth={auth}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest-movies" element={<LatestMovies />} />
        <Route path="/my-watchlist" element={<WatchList auth={auth} user={user} />} />
        <Route path="/movie/:id" element={<MovieData auth={auth} user={user}/>} />
        <Route path="/login" element={<Login auth={auth} username={user} handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp auth={auth} handleSignup={handleSignup}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
