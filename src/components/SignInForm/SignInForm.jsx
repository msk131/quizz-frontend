import React, { Component } from 'react';

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
		return ( <>
				<nav className="row navbar navbar-expand-lg navbar-light bg-light m-1">
					<div className="col-9 navbar-header ">
						<div className="row">
							<div className="col-2">
								<img src="/img.png" alt="Clearwater Analytics"/>
							</div>
							<div className="col-6">
								<div className="row">
									<div className="col-12">
										<h4 className="mb-6">BrainTeaser</h4>
									</div>
									<div className="col-1">
									</div>
									<div className="col-4">
										<small className="fs-23">
											POWERED BY AI/chatGPT
										</small>
									</div>
								</div>
							</div>
						</div>

					</div>



				</nav>
				<div className="row p-5">
					<div className="col-3">
					</div>
					<div className="col-3 p-10 border border-secondary-subtle">
						<form className="form-inline" onSubmit={this.handleSubmit}>

							<div className="form-group m-1">

								<h2 className="subtitle has-text-centered is-3 bg-secondary-subtle border border-secondary p-1">
									Admin Login Page
								</h2>
								<div className="form-group m-1">
									<label htmlFor="field_email"> Email: &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
								<div className="form-group m-1">
									<label htmlFor="field_password">Password:&nbsp; </label>
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
								<div className="form-group m-4">
								<input
									type="submit"
									value="Log in"
									id="input_submit"
									className="btn btn-info"
									onClick={() => this.checkingPasswordAndLogin}
								/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default SignInForm;