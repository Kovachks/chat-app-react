import React, {Component} from 'react';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={(props) => ( <Home/> )}/>
                </div>
            </Router>
        );
    }
}

export default App;