import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }
  render() {
    return (
      <div>Timer</div>
    );
  }
}

export default Timer;
