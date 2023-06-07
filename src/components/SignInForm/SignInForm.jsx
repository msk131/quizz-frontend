import React, { Component } from 'react';
import './SignInForm.css';

const API = 'http://localhost:8080/authenticate';

class SignInForm extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		this.checkingPasswordAndLogin();
    }
    
    redirection(result) {
		let jwtToken = localStorage.setItem('jwtToken', result.jwt)
		let username = localStorage.setItem('username', this.state.email)

        window.location = '/admin';
    }

	checkingPasswordAndLogin() {
        fetch(API, {
            method: 'post',
            headers: {
              Accept: 'application/json, text/plain, */*',
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.email, password: this.state.password})
          })
            .then((res) => res.json())
            .then((res) => (res.status === (403 || 400)) ? alert("Incorrect! Try again"):  this.redirection(res))
	}

	render() {
		return (
			<div className="signup__page">
				<form id="form_wrapper" onSubmit={this.handleSubmit}>

					<div id="form_left">

						<img
							src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F02%2F11%2F22%2F41%2Fquiz-2058888_640.png&f=1&nofb=1"
							alt="admin"
						/>

					</div>

					<div id="form_right">
						<img
							src="/img.png"
							alt="Clearwater Analytics"
						/>
						<h1 className="subtitle has-text-centered is-3">Enter your details</h1>
						<div className="input_container">
							<i className="fa fa-address-book-o" />
							<input
								placeholder="Login"
								type="text"
								name="email"
								id="field_email"
								className="input_field"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>
						<div className="input_container">
							<i className="fa fa-key" />
							<input
								placeholder="Password"
								type="password"
								name="password"
								id="field_password"
								className="input_field"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
						<input
							type="submit"
							value="Log in"
							id="input_submit"
							className="input_field"
							onClick={() => this.checkingPasswordAndLogin}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SignInForm;