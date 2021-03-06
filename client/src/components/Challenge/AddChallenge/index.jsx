import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',
    difficulty: null,
    fn: '',
    input: '',
    output: '',
    testcase: [],
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    if (this.state.testcase.length === 0) {
      return alert('Please add tests cases before submit');
    }
    const { title, content, difficulty, fn, testcase} = this.state;
    const id = localStorage.getItem('id');
    
    const body = {
      title,
      content,
      difficulty,
      fn
    }
    
    const result = await axios.post('http://localhost:3396/api/challenges/addChallenge', body);
    this.state.testcase.forEach( (test) => {
      let tests = {
        testcase: JSON.stringify(test),
        challenge_id: result.data[0].id
      }
      axios.post('http://localhost:3396/api/testCases/', tests);
    })

    let userChallenge = {
      user_id: id,
      challenge_id: result.data[0].id,
      type: 0
    }
    axios.post('http://localhost:3396/api/usersChallenges', userChallenge);
    this.props.history.push('/home');
  }

  addNewTestCase = (e) => {
    e.preventDefault();
    let tempTestCase = this.state.testcase;
    const { input, output } = this.state;
    tempTestCase.push({
      input,
      output
    })
    
    this.setState({ 
      testcase: tempTestCase,
      input: '',
      output: '',
    })
  }
  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
          <label>Challenge Details:</label>
          <br/>
          <br/>
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <br/>
          <br/>
          <Input
            name='content'
            type='content'
            placeholder={'enter content'}
            onChange={this.handleChallengeInput}
            />
          <br/>
          <br/>
          <Input 
            name='difficulty'
            type='difficulty'
            placeholder={'enter your difficulty'}
            onChange={this.handleChallengeInput}
            />
          <br />
          <br />
          <Input 
            name='fn'
            type='fn'
            placeholder={'enter function name'}
            onChange={this.handleChallengeInput}
            />
          <br />
          <br />
          <label>Test Case(s):</label>
            <Input
              name='input' 
              type='text' 
              placeholder='input'
              value={this.state.input}
              onChange={this.handleChallengeInput}
              />
            <Input 
              name='output' 
              type='text' 
              placeholder='expected output'
              value={this.state.output}
              onChange={this.handleChallengeInput}
              />
          <br/>
          <Button 
            backgroundColor='red'
            color='white' 
            text='Add Test Case'
            onClick={(e) => this.addNewTestCase(e)}
            />
          <br/>
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
