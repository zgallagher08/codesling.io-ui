import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

let slingId;

class Home extends Component {
  state = {
    allChallenges: [],
    selectedChallenge: {}
   }

   async componentDidMount() {
    const { data } = await axios.get(`http://localhost:3396/api/challenges`);
    this.setState({ 
      allChallenges: data,
      selectedChallenge: JSON.stringify(data[0])
    });
   }

  randomSlingId = () => {
    slingId = `${randomstring.generate()}`;
  }

  handleDuelClick = () => {
    this.randomSlingId();
    this.props.history.push({
      pathname: `/${slingId}`,
      state: {
        challenge: this.state.selectedChallenge
      }
    });
  }
  
  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleHistoryClick = () => {
    this.props.history.push('/history');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  handleChallengeDetailSelect = () => {
    this.props.history.push({
      pathname: '/challenge',
      state: {challenges: this.state.allChallenges}
    })
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map((challenge, key)=> {
            return (
            <option
              key={key}
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Challenge Details"
          onClick={() => this.handleChallengeDetailSelect()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="History"
          onClick={() => this.handleHistoryClick()}
        />
      </div>
    );
  }
}

export default Home;
