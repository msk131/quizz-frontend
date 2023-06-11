import React from 'react';
import styles from './App.module.css';

const MODULES_API = 'http://localhost:8080/module/';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', moduleId:'1', options:this.getModules()};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    getModules = () => {
        fetch(`${MODULES_API}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
        }).then(res=>res.json())
            .then(res => {
                this.setState({...this.state, options: res});
             });
    }

    handleChange(e){
        let target = e.target;
        let value = target.value;
        let name = target.name;
        console.log(value)

        this.setState({
            [name]: value
        });
    }

  handleSubmit(event) {
    event.preventDefault();
    let name = localStorage.setItem("name", this.state.name);
    let moduleId = localStorage.setItem("moduleId", this.state.moduleId);
    window.location = '/quiz/'+this.state.name+'/'+this.state.moduleId;
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

        <h2>Welcome to the <span className="fs-1">BrainTeaser</span></h2>
        <span className="fs-6">Start the test by selecting the module you want to appear for & by entering your name</span>
        <form className={styles.subscribe} onSubmit={this.handleSubmit}>


            <select name="moduleId" onChange={this.handleChange}>
              <option value="none" selected>Select Module Name</option>
              {this.state.options?.map(currentOption => (
                  <option key={currentOption.id} value={currentOption.id}>
                    {currentOption.name}
                  </option>
              ))}
            </select>
           <input type="text" placeholder="Your name or nickname" autocomplete="off" required="required"  name="name" value={this.state.name} onChange={this.handleChange}/>
          <button type="submit"> <span>Start</span></button>
        </form>
        <a onClick={this.handleAdminSubmit} className={styles.btn_admin}>Are you admin?</a>
    </div>
  </div>
    );
  }
}

export default App;
