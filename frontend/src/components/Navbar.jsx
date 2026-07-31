import { Link } from "react-router-dom";
import "./Navbar.css";
import NotificationDropdown from "./NotificationDropdown";


function Navbar() {

  return (

    <nav className="navbar">

      <h2 className="logo">
        ArchiVerse
      </h2>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/services">
          Services
        </Link>

        <Link to="/architects">
          Architects
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>


        <NotificationDropdown />


      </div>


    </nav>

  );

}


export default Navbar;