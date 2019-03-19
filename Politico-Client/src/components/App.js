import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Header from './nav/Header';
import Footer from './nav/Footer';
import Landing from './landing/landing';
import viewoffice from './dashboard/viewoffice';
import '../styles/landing.css';


class App extends Component {
    render() {
        return(
            <div>
                <div className="App">
                    <Router>
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/view" component={viewoffice}/>
                        {/* <Route exact path="/profile" component={Profile}/>*/}  
                        <Footer />                                      
                    </Router>
                </div>
            </div>
        );        
    }
}

export default App;