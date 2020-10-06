import React, {Component} from 'react';
import './App.css';
import Mainpage from './Mainpage';
import Login from './Login';
import Articles from './Articles';
import EditArticle from './EditArticle';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase.js';
import NewArticle from './NewArticle';
import SingleArticle from './SingleArticle';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user}); 
      } else {
        this.setState({user: null});
      }
      });
  }
  
  render() {
    return (
      
      <Router>
          <div className="App">
          <Switch>
            <Route path="/" exact component={Mainpage}/>
            <Route path="/login" component={Login}/>
            <Route path="/articles" component={Articles}/>
            <Route path="/edit/:id" component={EditArticle}/>
            <Route path="/addarticle" component={NewArticle}/>
            <Route path="/article/:id" component={SingleArticle}/>
          </Switch>
          
          </div>

      </Router>
      
      
    );
  }
}

export default App;


