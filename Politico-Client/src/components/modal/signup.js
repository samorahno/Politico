
import React,{ Component } from 'react';
import axios from 'axios';
import '../../styles/landing.css';

const baseUrlSignup = 'https://samson-politico.herokuapp.com/api/v1/';
class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            password_confirm: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(e) {
        document.getElementById('myModal2').style.display = 'none';
        this.setState({
            error: ''
        });
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    
    
    onSubmit(e){
        e.preventDefault();
        this.setState({
            error: ''
        });
        var newUser = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            phone: this.state.phoneNumber,
            password: this.state.password,
            confirmPassword: this.state.password_confirm,

        };

        axios.post(`${baseUrlSignup}auth/signup`, newUser)
        .then(res => () => {
            console.log(res.data);
        })
        .catch(err => this.setState({error: err.response.data}));

    }
    render(){
        const {error} = this.state.error;
        const { children, gender } = this.props;
        const { name } = this.state;
        return (
            <div>
                <div id="myModal2" className="modal" style={{display: this.props.showModal ? 'block' : 'none'}}>

<div class="modal-content" id="modalcontent">
    <span class="close" onClick = {this.closeModal} >&times;</span>

        {/* <form action="views/userdashboard.html" className="form-modal dd"> */}

        <form className="form-modal dd" onSubmit={this.onSubmit}>
            <h1>Signup</h1>
            <div className = "success-msg" id = "success-msg"></div>
            <div className = "warning-msg" id = "warning-msg"></div>
            <div className = "error-msg" id = "error-msg"></div>
            <div className = "info-msg" id = "info-msg"></div>
            {error && (<div className="error-msg">{error}</div>)}
            <div className="input-group">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="First Name" id="firstname" value={this.state.firstName} onChange={this.onChange}/>

            </div>
            <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Last Name" id="lastname" value={this.state.lastName} onChange={this.onChange}/>

            </div>
            <div classname="input-group">
                <label>E-mail</label>
                <input type="email" name="email" placeholder="E-mail" id="signupemail" value={this.state.email} onChange={this.onChange}/>
            </div>
            <div class="input-group">
                <label>Phone Number</label>
                <input type="number" name="phoneNumber" placeholder="Phone Number" id="phonenumber" value={this.state.phoneNumber} onChange={this.onChange}/>
            </div>
            <label style={{width:'33%'}}>Password / </label><label style={{width:'33%'}}>Confirm Password</label>
            <div class="input-group">
                <input type="password" name="password" placeholder="Password" id="signuppassword" style={{width:'33%'}} value={this.state.password} onChange={this.onChange}/>
                <input type="password" name="password_confirm" placeholder="Confirm Password" id="confirmsignuppassword" style={{width:'33%'}} value={this.state.password_confirm} onChange={this.onChange}/>
            </div>
            <div class="input-group">
                <button type="submit" name="submit" class="btn" id="signupbtn">Register</button>
            </div>

        </form>
</div>

</div>
            </div>
        );
    }
}

export default Signup;