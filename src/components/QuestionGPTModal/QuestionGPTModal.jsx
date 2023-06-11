import React from "react";

const API = 'http://localhost:8080/module/json';
const MODULES_API = 'http://localhost:8080/module/';

export default class QuestionGPTModal extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),
            moduleId:'',
            json:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    componentDidMount = () => {
        this.getModules();
    }
    getModules = async () => {
        this.setState({...this.state, showHide: "d-none"})
        await fetch(`${MODULES_API}`, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                this.setState({...this.state, options: res});
            });
    }
    handleSubmit(e) {
        e.preventDefault();

        if(this.state.moduleId && this.state.json)
            this.uploadJson();
    }
    uploadJson = async () => {

        const josnObj = JSON.parse(this.state.json);
        var newkey = "id";
        var newVal = this.state.moduleId;
        josnObj[newkey] = newVal;
        await fetch(API, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(josnObj)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                localStorage.setItem("message", "Questions created successfully");
                localStorage.setItem("showHide", "");
            })
            .catch((error) => {
                console.log(error)
                localStorage.setItem("message", error);
                localStorage.setItem("showHide", "");
            });
            window.location="/admin"
    }

    modalContent = () => {
        return(
                <div className="col-12">
                    <div className="row border bg-secondary-subtle border-secondary">
                        <div className="col-12 mt-2">
                            <h6 className="has-text-centered bg-secondary-subtle">Create the Questions using chatGPT response</h6>
                        </div>
                    </div>
                    <div className="row  border border-secondary">
                     <div className="container ">
                        <form className="form-inline" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group m-1">
                                <select name="moduleId" className="form-select" id="moduleSelect" value={this.state.moduleId} aria-label="Select Module Name" onChange={this.handleChange}>
                                    <option>Select Module Name</option>
                                    {this.state.options?.map(currentOption => (
                                        <option key={currentOption.id +50} value={currentOption.id}>
                                            {currentOption.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group m-1">
                                <div className="form-group m-1">
                                   <textarea id="json" name="json" rows="4" cols="26"
                                             className="form-control" id="json"
                                             aria-describedby="json"  name="json" value={this.state.json}
                                             onChange={this.handleChange}
                                             placeholder="Paste the Json content here to create questions using chatGPT response" >
                               </textarea>
                                </div>
                            </div>

                            <div className="form-group row m-2">
                                <input
                                    type="submit"
                                    value="Create"
                                    id="input_submit"
                                    className="btn btn-info"
                                    onClick={() => this.uploadJson}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">


                </div>

                <div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <>
                {this.state.jwt ? this.modalContent() : ""}
            </>
        )
    }
}