import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js'
import '../src/css/AllArticles.css';
import {Link} from 'react-router-dom';

class Singlearticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postcontent: [],
        };
        
    };

    componentDidMount() {
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
                    editdate: posts[postid].editdate
                });
            }
            this.setState({
                postcontent: newitem
            });
        });
    };

    render()
    {
        return (
            <div class="container">
                {this.state.postcontent.map((postcontent) => {
                    return (
                        <div class="post">
                                    <Link to={/article/+ postcontent.id} class="link">
                                        <h2 class="title">{postcontent.title}</h2>
                                        <h3 class="description">{postcontent.description}</h3>
                                    </Link>
                            <div class="line"></div>
                        </div>
                    )
                })}
            </div>
        );
    }

}

export default Singlearticle;