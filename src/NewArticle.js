import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js'
import Footer from './Footer';
import '../src/css/EditArticle.css';
import '../src/css/Buttons.css';

class NewArticle extends Component {
    constructor(props)
    {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.pushing = this.pushing.bind(this);
      this.state = {
        title: '',
        description: '',
        text: '',
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

    pushing() 
    {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth()+1;
      var year = date.getFullYear();
      
      const newReference = firebase.database()
      .ref('posts/')
      .push()

      newReference
      .set({
        title: this.state.title,
        description: this.state.description,
        text: this.state.text,
        creationdate: day + "." + month + "." + year,
        editiondate: null,
        uid: this.state.uid
      });
      this.props.history.push('/articles');

    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    handleClick(e) {
      this.props.history.push('/articles');
  }

    render() {

      return(
        <div>
        <div>
        <h1>Страница добавления статьи</h1>
        </div>
        <div class="edit-form-container">
        <form>
          <label>Заголовок</label><br/>
          <input id="title" class="input_1" name="title" type="text" value={this.state.title} onChange={this.handleChange} required/><br/>
          <label>Описание</label><br/>
          <input id="description" class="input_1" name="description" type="text" value={this.state.description} onChange={this.handleChange} required/><br/>
          <label>Текст</label><br/>
          <textarea id="text" class="textarea_1" name="text" value={this.state.maintext} onChange={this.handleChange}></textarea><br/>
          <p><button class="btn green" type="button" onClick={this.handleClick}>Отмена</button>
          <button type="button" class="btn green" onClick={this.pushing}>Добавить</button></p>
        </form>
        
        </div>
        <Footer />
        </div>
  
      );
    }
}

export default NewArticle;