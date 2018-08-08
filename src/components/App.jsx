import React, { Component, Link } from 'react';
import Profile from './Main.jsx';
import {
  lookupProfile
} from 'blockstack';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      user: 0,
      name: "",
      page: 0,
      userCount: 0,
      appOrigin: ""
    }
    this.query = this.query.bind(this);
    this.appOrigin = this.appOrigin.bind(this);
    this.nameQuery = this.nameQuery.bind(this);
    this.subdomainQuery = this.subdomainQuery.bind(this);
    this.subdomainNameQuery = this.subdomainNameQuery.bind(this);
  }

  appOrigin(e) {
    this.setState({ appOrigin: e.target.value });
  }

  query() {
    let link = 'https://core.blockstack.org/v1/names?page=' + this.state.page;
      axios
        .get(
          link
        )
        .then(res => {
          if(res.data.length > 0) {
            if(this.state.user < 100) {
              this.setState({ name: res.data[this.state.user], user: this.state.user + 1 });
              this.nameQuery();
            } else {
              this.setState({page: this.state.page + 1, user: 0});
              this.query();
            }
          } else {
            this.setState({ page: 0, user: 0});
            setTimeout(this.subdomainQuery, 300);
          }

        })
        .catch(error => {
          console.log(error);
        });
  }

  nameQuery() {
    let appOrigin = this.state.appOrigin;
    console.log(this.state.name);
    let graphite = 'https://app.graphitedocs.com';
    console.log("getting....")
    axios.get('https://gaia-gateway.com/' + this.state.name)
    .then(response => {
      let array = [];
      console.log(Object.getOwnPropertyNames(response.data).includes('https://app.graphitedocs.com'));
          if(Object.getOwnPropertyNames(response.data).includes('https://app.graphitedocs.com')) {
            console.log("App User!");
            this.setState({ userCount: this.state.userCount + 1 });
            this.query();
          } else {
            this.query();
          }
    })
    .catch(error => {
      console.log(error);
      this.query();
    })
    // lookupProfile(this.state.name, "https://core.blockstack.org/v1/names")
    //   .then((profile) => {
    //     console.log(profile);
    //     if(profile.apps) {
    //       if(profile.apps[this.state.appOrigin]) {
    //         console.log("App User!");
    //         this.setState({ userCount: this.state.userCount + 1 });
    //         this.query();
    //       } else {
    //         this.query();
    //       }
    //     } else {
    //       this.query();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('could not resolve profile')
    //     this.query();
    //   })
  }

  subdomainQuery() {
    let link = 'https://core.blockstack.org/v1/subdomains?page=' + this.state.page;
      axios
        .get(
          link
        )
        .then(res => {
          if(res.data.length > 0) {
            if(this.state.user < 100) {
              this.setState({ name: res.data[this.state.user], user: this.state.user + 1 });
              this.subdomainNameQuery();
            } else {
              this.setState({page: this.state.page + 1, user: 0});
              this.subdomainNameQuery();
            }
          } else {
            console.log("Done");
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  subdomainNameQuery() {
    console.log(this.state.name);
    let appOrigin = this.state.appOrigin;
    console.log(this.state.name);
    let graphite = 'https://app.graphitedocs.com';
    console.log("getting....")
    axios.get('https://gaia-gateway.com/' + this.state.name)
    .then(response => {
      console.log(Object.getOwnPropertyNames(response.data).includes('https://app.graphitedocs.com'));
          if(Object.getOwnPropertyNames(response.data).includes('https://app.graphitedocs.com')) {
            console.log("App User!");
            this.setState({ userCount: this.state.userCount + 1 });
            this.query();
          } else {
            this.query();
          }
    })
    .catch(error => {
      console.log(error);
      this.setState({ userCount: this.state.userCount + 1 });
      this.query();
    })
  }

  render() {
    const { userCount } = this.state;
    console.log("App user count: ");
    console.log(this.state.userCount);
    console.log("current page: ");
    console.log(this.state.page);
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
        <h4>Enter app origin domain</h4>
        <input type="text" value={this.state.appOrigin} onChange={this.appOrigin} />
        <button onClick={this.query}>Start Query</button>
        <Profile
          userCount={userCount} />
        </div>
      </div>
    );
  }
}
