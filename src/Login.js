import React, {Component} from 'react';
import './css/Login.css';
import firebase from './firebase.js';
import Menu from './Menu';
import $ from 'jquery';



class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email:'',
      password:'',
      uid: '', 
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

  componentDidUpdate() {
    $("#signup").click(function() {
      $(".message").css("transform", "translateX(100%)");
      if ($(".message").hasClass("login")) {
        $(".message").removeClass("login");
      }
      $(".message").addClass("signup");
    });
    
    $("#login").click(function() {
      $(".message").css("transform", "translateX(0)");
      if ($(".message").hasClass("login")) {
        $(".message").removeClass("signup");
      }
      $(".message").addClass("login");
    });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{ this.props.history.push('/articles');
    }).catch((error) => {
      console.log(error);
    });
    
  }

  signup(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push('/articles');
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    if(this.state.uid == null)
    {
      return(
        <div class="page-body">
          <div class="login-form-container">
            <div class="message signup">
              <div class="btn-wrapper">
                <button class="button" id="signup">Sign Up</button>
                <button class="button" id="login"> Login</button>
              </div>
            </div>
            <div class="form form--signup">
            <div class="form--heading">Регистрация</div>
    <form autocomplete="off">
      <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
      <input type="password" id="password" name="password" class="inputlogin" value={this.state.password} onChange={this.handleChange}placeholder="Пароль" />
      <button class="button" onClick={this.signup}>Sign Up</button>
    </form>
  </div>
  <div class="form form--login">
    <div class="form--heading">Вход </div>
    <form autocomplete="off">
      <input id="email" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="E-mail" />
      <input type="password" id="password" name="password" class="inputlogin" value={this.state.password} onChange={this.handleChange}placeholder="Пароль" />
      <button class="button" onClick={this.login}>Login</button>
    </form>
  </div>

          </div>
        <script src="./LoginAnimation.js"></script>
        </div>
        
      );
    }
    else if (this.state.uid != null){
      return(
        <div>
          <div class="menu-opacity">
          <Menu />
          </div>
          <h1>Вы уже в сети</h1>
        </div>
      );
    }
    
  }
} 

export default Login;