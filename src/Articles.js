import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js';
import {Link, withRouter} from 'react-router-dom';
import Menu from './Menu';
import Header from './Header';
import '../src/css/AllArticles.css';
import Footer from './Footer';
import '../src/css/Buttons.css';

class Articles extends Component {
  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
      this.logout = this.logout.bind(this);
      this.state = {
          postcontent: [],
          uid: '', 
      };
      
  };

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.setState({uid : user.uid}); 
        } else {
          this.setState({uid: null});
        }
        });

        let newitem = [];
        const db = firebase.database();
        const postdata = db.ref('posts/');

        postdata.on('value', (snapshot) =>
        {
            let posts = snapshot.val();
            for(let postid in posts)
            {
                newitem.push({
                  id: postid,
                  title: posts[postid].title,
                  description: posts[postid].description,
                  text: posts[postid].text,
                  creationdate: posts[postid].creationdate,
                  editdate: posts[postid].editdate,
                  uid: posts[postid].uid
                });
            }
            this.setState({
                postcontent: newitem
            });
        });
  };

  delete = param => e => 
  {
    firebase.database().ref('posts/' + param).remove();
    this.componentDidMount();
    console.log('Delete');
  }

  logout() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    this.props.history.push('/');
  }

 
  render() {
        return (
          
          <div>
            <Menu />
            <Header title="Мои статьи"/>
            <div class="container">
              {this.state.postcontent.map((postcontent) => {

                if(postcontent.uid === this.state.uid)
                {
                  return (
                    <div key={postcontent.id} class="post">
                      <Link to={/article/+ postcontent.id} class="link">
                        <h2 class="title">{postcontent.title}</h2>
                        <h3 class="description">{postcontent.description}</h3>
                      </Link>
                        <button class="btn green" type="button" onClick={this.delete(postcontent.id)}>Удалить</button>     
                        <button class="btn green" type="button"><Link to={/edit/+ postcontent.id} class="btnlink" >Редактировать</Link></button>
                        <div class="line"></div>
                    </div>
                );
                }
                  
              })}
              </div>
              <br/>
              <button class="btn green" type="button"><Link to='/addarticle' class="btnlink" >Добавить новую статью</Link></button>
              <Footer />
          </div>
      );  

      
  }
}

export default withRouter(Articles);