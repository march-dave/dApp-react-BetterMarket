import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Menu extends Component {
    render() {
        return (
            <div>
                <ul className="nav">
                    <li className="nav-item"><Link to="/container/Home" className="nav-link">Home</Link></li>
                    <li className="nav-item"><Link to="/container/DBPlatform" className="nav-link">DB Platform</Link></li>
                    <li className="nav-item"><Link to="/container/ReverseAuction" className="nav-link">Reverse Auction</Link></li>
                    <li className="nav-item"><Link to="/container/MarketPlace" className="nav-link">Market Place</Link></li>
                    <li className="nav-item"><Link to="/container/Help" className="nav-link">Help</Link></li>
                </ul>
            </div>
        );
    }
}

export default Menu;