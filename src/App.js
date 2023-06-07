import React from 'react';
import styles from './App.module.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = localStorage.setItem("name", this.state.value);
    window.location = '/quiz';
  }

  handleAdminSubmit(event){
    event.preventDefault();
    window.location = "/login";
  }

  render() {
    return (
<div>
  <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-header"> <img
          src="/img.png"
          alt="Clearwater Analytics"
      />
      </div>
  </div>

  <div className={styles.subscribe_box}>

        <h2>Welcome to the Java Quiz</h2>
        <form className={styles.subscribe} onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name or nickname" autocomplete="off" required="required" value={this.state.value} onChange={this.handleChange}/>
          <button type="submit"> <span>Start</span></button>
        </form>
        <a onClick={this.handleAdminSubmit} className={styles.btn_admin}>Are you admin?</a>
    </div>
  </div>
    );
  }
}

export default App;
