import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3">Home</h1>
          <p className="lead">Window Width: {this.props.size}</p>
          <p className="lead">Scroll Position: {this.props.scroll}</p>
        </div>
      </div>
    );
  }
}

export default Home;
