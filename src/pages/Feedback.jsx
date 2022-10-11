import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>Feedback</div>
    );
  }
}

export default connect()(Feedback);
