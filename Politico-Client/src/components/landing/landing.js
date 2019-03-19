import React, { Component } from 'react';
import Login from '../modal/login.js';
import Signup from '../modal/signup.js';
import { Link } from 'react-router-dom';
import '../../styles/landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignupModal: false,
            showLoginModal: false
        };
    }
    isSignupModal() {
        this.setState({
            showSignupModal: !this.state.showSignupModal
        });
    };
    isLoginModal(e) {
        
        this.setState({
            showLoginModal: !this.state.showLoginModal
        })
    };
    render() {
        return (
            <div>
                <div id="showcase" className="grid">

                    <h1 className="white">Welcome to Politico</h1>
                    <p className="header-line2">...your vote is your right...</p>
                    <Link to="#" className="btn2" id="myBtn" onClick={this.isLoginModal.bind(this)}>Login</Link>
                    <Link
                        to="#"
                        className="btn2"
                        id="myBtn2"
                        onClick={this.isSignupModal.bind(this)}
                    >Sign Up</Link>

                    <div className="headline_intro"> <span>
                        <center><b>About Politico</b></center> <br />
                        Politico is a platform that enables citizens give their mandate to politicians running different
                        government offices while building trust in the process through transparency.
        </span>

                    </div>

                </div>

                <div className="container8">
                    <span style={{ width: '100%' }}>
                        <p style={{ width: '100%' }}>The simple steps to
            follow is shown below:</p>
                    </span>
                    <section className="step-indicator8">

                        <div className="step8 step1">
                            <div className="step-icon8">1</div>

                        </div>
                        <div className="indicator-line8"></div>
                        <div className="step8 step2">
                            <div className="step-icon8">2</div>

                        </div>
                        <div className="indicator-line8"></div>
                        <div className="step8 step3">
                            <div className="step-icon8">3</div>

                        </div>
                    </section>
                </div>



                <div className="steps mt">
                    <div className="column step">
                        <p className="section-text">
                            Create an account and login as a user to have access to view voting parameters.
        </p>
                    </div>
                    <div className="column step">
                        <p className="section-text">
                            Vote any political party of your choice by selecting the party and your favorite candidate
        </p>
                    </div>
                    <div className="column step">
                        <p className="section-text">
                            You can view the results of the election just by clicking the view result button.
        </p>

                        <Login showModal={this.state.showLoginModal} />
                        <Signup showModal={this.state.showSignupModal} />
                    </div>
                </div>
            </div>
        );
    }


}

export default Landing;