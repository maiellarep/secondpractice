import React from 'react';
import firebase from './firebase.js';
import Menu from './Menu';
import '../src/css/SingleArticle.css';
import Footer from './Footer.js';


class SingleArticle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '', 
            description: '',
            text: '',
            creationdate: '',
            editdate: null
        }
    }

    componentDidMount() {
        firebase.database()
        .ref('posts/' + this.props.match.params.id)
        .once('value')
        .then(snapshot => {
            this.setState ({
                title: snapshot.val().title,
                description: snapshot.val().description,
                text: snapshot.val().text,
                creationdate: snapshot.val().creationdate,
                editdate: snapshot.val().editdate
            })
        });
    }

    render() {
        return(
            <div>
                <div class="menu-opacity">
                    <Menu />
                </div>
                <div class="header-article">
                    <div class="article-title-container">
                        <h1 class="article-title">{this.state.title}</h1>
                        <h2 class="article-description">{this.state.description}</h2>
                        <span class="publication-info">Опубликовано: {this.state.creationdate}</span>
                    </div>
                </div>
                <div class="container">
                    <p class="maintext">{this.state.text}</p>
                    {(() => {if(this.state.editdate != null) {
                        return(<p class="editdate">Изменено: {this.state.editdate}</p>);
                    }
                    })()}
                </div>
                <Footer />
            </div>
        )
    }

}

export default SingleArticle;