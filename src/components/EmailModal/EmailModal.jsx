import React from "react";

const API = 'http://localhost:8080/module/mail';

export default class EmailModal extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),
            to:'',
            body:'',
            subject:'',
            inputFile:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this)
    }
    handleChangeFile(e){

        let files = e.target.files;
        console.log(files[0]);
        this.setState({...this.state, inputFile:files[0]})
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
    handleSubmit(e) {
        e.preventDefault();

        if(this.state.subject && this.state.body && this.state.to)
            this.sendMail();
        else{

            alert("Enter all the fields")
        }
    }
    sendMail = async () => {

        const formData = new FormData();
        formData.append('file', this.state.inputFile);
        await fetch(API+"?from=manishankarkumar131@gmail.com&name=All&to="+this.state.to+
            "&subject="+this.state.subject+"&body="+this.state.body, {
            method: 'post',
            body: formData
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem("message", "Email sent successfully");
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
                        <h6 className="has-text-centered bg-secondary-subtle">Send Mail</h6>
                    </div>
                </div>
                <div className="row  border border-secondary">
                    <div className="container ">
                        <form className="form-row" onSubmit={(e) => this.handleSubmit(e)} enctype="multipart/form-data">
                            <div className="form-group  col-12 m-1">
                                <input type="text" className="form-control" id="to"
                                       aria-describedby="to"  name="to" value={this.state.to} onChange={this.handleChange}
                                       placeholder="Enter Email addresses, separated by comma"  />

                            </div>
                            <div className="form-group col-12  m-1">
                                <input type="text" className="form-control" id="moduleName"
                                       aria-describedby="subject"  name="subject" value={this.state.subject}
                                       onChange={this.handleChange} placeholder="Subject"  />
                            </div>
                            <div className="form-group col-12  m-1">
                                <input type="file" className="form-control" id="moduleName"
                                       aria-describedby="inputFile"  name="inputFile"
                                       onChange={this.handleChangeFile} placeholder="Upload File"  />
                            </div>

                            <div className="form-group col-12  m-1">
                                <textarea id="json" name="json" rows="4" cols="26"
                                          className="form-control" id="json"
                                          aria-describedby="json"  name="body" value={this.state.body}
                                          onChange={this.handleChange}
                                          placeholder="Body" >
                               </textarea>
                            </div>

                            <div className="form-group col-12  m-2">
                                <input
                                    type="submit"
                                    value="Send Mail"
                                    id="input_submit"
                                    className="btn btn-info"
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