import React, { Component } from 'react';

export default class Main extends Component {

  render() {

    return (
      <div className="panel-welcome" id="section-2">
        <h3>App User Count</h3>
        <strong><h6>{this.props.userCount}</h6></strong>
      </div>
    );
  }
}
