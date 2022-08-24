import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faFilm, faStar, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import './navstyle.css'

const Navbar = (props) => {
    const authState = props.auth
    let navButtons = {color:'white',textDecoration:'None', fontSize:'1.5rem', display:'flex', flexDirection:'row', alignItems:'center'}

    const handleSignOut = () => {
        props.handleSignOut()
    }

    return (
        <>
        <nav
            style={{
            width: "100%",
            backgroundColor: "#1A171E",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: "100px",
            }}
        >
            <div>
            <Link style={navButtons} to="/">
                <FontAwesomeIcon className="icon" icon={faHouseChimney} /> 
                <h3 className='Home' variant="h6">Home
                </h3>
            </Link>
            </div>
            <div>
            <Link style={navButtons} to="/latest-movies">
                <FontAwesomeIcon className="icon" icon={faFilm} />
                <h3 className='LatestMovies' variant="h6">
                Latest Movies
                </h3>
            </Link>
            </div>
            <div>
            <Link style={navButtons} to="/my-watchlist">
                <FontAwesomeIcon className="icon" icon={faStar} />
                <h3 className="Watchlist" variant="h6">
                    Watchlist
                </h3>
            </Link>
            </div>
            <div>
                {authState ? 
                <Link style={navButtons} to="/" onClick={handleSignOut}>
                    <FontAwesomeIcon className="icon" icon={faSignOut} />
                    <h3 className="Watchlist" variant="h6">
                        Logout
                    </h3>
                </Link> 
                : 
                <Link style={navButtons} to="/login">
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <h3 className="Watchlist" variant="h6">
                        Login
                    </h3>
                </Link>}
            </div>
        </nav>
        <Outlet />
        </>
    );
}

export default Navbar