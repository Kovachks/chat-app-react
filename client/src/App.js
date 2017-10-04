import React, {Component} from 'react';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import OrderList from './components/OrderList/OrderList'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={(props) => ( <OrderList/> )}/>
                </div>
            </Router>
        );
    }
}

export default App;