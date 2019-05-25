import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Header from './nav/Header';
import Footer from './nav/Footer';
import Landing from './landing/landing';
import viewoffice from './dashboard/viewoffice';
import '../styles/landing.css';
import Sidebar from '../components/nav/DashboardSidebar';


class App extends Component {
    render() {
        return(
            <div>
                 <Router>
                    <div className="App">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/view" component={viewoffice}/>
                        {/* <Route exact path="/profile" component={Profile}/>*/} 
                        <Route exact path="/member" component={Sidebar} /> 
                        <Footer /> 
                    </div>                                     
                </Router>               
            </div>
        );        
    }
}

export default App;