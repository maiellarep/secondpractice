import React from 'react';
import firebase from './firebase.js'

class UserArticle extends React.Component {
    constructor(props)
    {
        super(props);
        this.delete = this.delete.bind(this);
        this.id = this.props.id;
        this.state = {
            postcontent: [],
            title: '', 
            description: '',
            text: '',
            uid: ''
        }
    }

    

    delete() 
    {
        firebase.database().ref('posts/' + this.id).remove();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() 
    {
        return (
            <div>
                    <h1>{this.id}</h1>
                            <div>
                                <div>
                                    
                                </div>
                            
                                <button type="button" onClick={this.delete}>Delete</button>
                                <hr/>
                            </div>
  

                    
                );
            </div>
        );
    }
}

export default UserArticle;