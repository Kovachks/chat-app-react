import React, {Component} from 'react';
import styles from './OrderList.css';
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000');

class OrderList extends Component {

    state = {
        value: ""
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          value: event.target.value
        })
      };

    post = () => {
        socket.emit('status added', this.state.value);
    }

    // refresh = () => {
    //     socket.on('refresh feed',function(msg){
    //         console.log(msg)
    //     }
    // };

    render() {
        return (
            <div>
                <form onSubmit={this.post}>
                <textarea type="text" value={this.state.value} onChange={this.handleChange} rows="5" cols="70"/><br /><br />
                <input type="submit" value="Submit"/>
                </form>
                <div className={styles.show_comments}
                >
                </div>
            </div>
        )
    
    }
}

export default OrderList