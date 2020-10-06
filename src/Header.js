import React from 'react';
import './css/Menu.css';
import './css/Header.css';

class Header extends React.Component {

    
    render() {
        return(
            <div class="header">
                        <div class="header-title-container">
                            <h1 class="main-title uppercase">{this.props.title}</h1>
                        </div>
            </div>
        );
    } 
}

export default Header;