import React from 'react';
import '../../styles/dashboard.css';

const Header = () => {
    return(
        <div>
        <header>
		    <a href="dashboard.html"><span></span>Politico</a>
		
		    <a href="#" class="minimize_button" onclick="togle_nav_func()"><span><i class="fa fa-bars fa-1x"></i></span></a>
	    </header>
        </div>
    );}

    export default Header;