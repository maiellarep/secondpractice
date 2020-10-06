import React from 'react';
import firebase from './firebase.js';
import './css/Menu.css';
import {Link, withRouter} from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: ''
        }
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
              this.setState({uid : user.uid}); 
            } else {
              this.setState({uid: null});
            }
        });
    };

    logout(e) {
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    
    render() {
        if(this.state.uid == null) {
            return(
                <div>
                <nav class="menu-container">
                    <div >
                        <span class="logo">Blog</span>
                    </div>
                    <div class="menu">
                        <ul >
                            <li><Link to='/'>Главная страница</Link> </li>
                            <li><Link to='/login'>Вход</Link></li>
                        </ul>
                    </div>
                </nav>
                </div>
            );
        }
        else {
            return(
                <div>
                <nav class="menu-container">
                    <div >
                        <span class="logo">Blog</span>
                    </div>
                    <div class="menu">
                        <ul >
                            <li><Link to='/'>Главная страница</Link></li>
                            <li><Link to='/articles'>Мои статьи</Link></li>
                            <li><a href='' onClick={this.logout}>Выход</a></li>
                        </ul>
                    </div>
                </nav>
                </div>
            );
        }
    } 
}

export default withRouter(Menu);