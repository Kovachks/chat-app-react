import React, {Component} from 'react';
import styles from './OrderList.css';
import openSocket from 'socket.io-client'
import API from '../../api/api'

const uri = "http://locathost:8000";

const socket = openSocket('http://localhost:8000');

class OrderList extends Component {

    state = {
        value: " ",
        comments: []
    };
    
    componentDidMount() {
        socket.on("refresh feed", (msg) => {
            this.setState({
                comments: [msg, ...this.state.comments]
            })
        })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          value: event.target.value
        })
      };

    post = (event) => {
        event.preventDefault()
        socket.emit('status added', this.state.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.post}>
                <textarea type="text" value={this.state.value} onChange={this.handleChange} rows="5" cols="70"/><br /><br />
                <input type="submit" value="Submit"/>
                </form>
                <div className={styles.show_comments}
                >{this.state.comments}
                </div>
            </div>
        )
    
    }
}

export default OrderList