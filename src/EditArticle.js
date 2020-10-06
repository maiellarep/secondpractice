import React from 'react';
import firebase from './firebase.js'
import '../src/css/EditArticle.css';
import '../src/css/Buttons.css';

class EditArticle extends React.Component {
    constructor(props)
    {
        super(props);
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            title: '', 
            description: '',
            text: ''
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
        text: snapshot.val().text
    })
  });

    }
    edit() 
    {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();


        firebase.database().ref('posts/' + this.props.match.params.id).update({
                title: this.state.title,
                description: this.state.description,
                text: this.state.text,
                editdate: day + "." + month + "." + year
            })
        
        this.props.history.push('/articles')
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    handleClick(e) {
        this.props.history.push('/articles');
    }

    render() 
    {
        return (
        <div>
            <h1>Страница редактирования статьи</h1>
            <div class="edit-form-container">
            <form>
                <div class="input_1">
                    <input id="title" name="title" type="text" value={this.state.title} onChange={this.handleChange}/><br/>
                </div>
                <div class="input_1">  
                    <input id="description" name="description" type="text" value={this.state.description} onChange={this.handleChange}/><br/>
                </div>
                <div class="textarea_1">   
                    <textarea  id="text" name="text" value={this.state.text} onChange={this.handleChange}></textarea><br/>
                </div>
                
                <p><button class="btn green" type="button" onClick={this.handleClick}>Отмена</button>
                   <button class="btn green" type="button" onClick={this.edit}>Редактировать</button></p>
            </form>
            </div>

        </div>
        )
    }
}

export default EditArticle;