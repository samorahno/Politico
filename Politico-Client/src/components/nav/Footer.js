import '../../styles/landing.css';

import React from 'react';
const Footer = () => {
    return(
        <div>
             <footer className="steps footercolor">
                <div className="column step">
                    <table className="footer-table">
                        <tr>
                            <td><span className="footer-td">
                                    <p><i className="fa fa-phone"></i> : +2348060955366 <br /> <i className="fa fa-map-marker"></i> : 28,
                                        Adewale Street, Victoria Island, Lagos, Nigeria <br /><i className="fa fa-envelope"></i> :
                                        samabos007@gmail.com 
                                    </p>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="column step">
                    <p>
                        Politico | by Abosede Samson &copy; 2019
                    </p>
                    <p>

                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
