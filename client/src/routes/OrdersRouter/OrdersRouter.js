import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

import './OrdersRouter.css';
import logo from '../../img/logo.png';
import { OrderForm, FAQ, Contact, About, Success } from '../../pages';
import { withGlobalState } from 'react-globally';

class OrdersRouter extends Component {
    componentDidMount(){
        fetch('/api/options')
            .then(response => response.json())
            .then(json => {
                this.props.setGlobalState({
                    options: json.response
                });
            });
    }
    render(){
        return (
            <div className="Application">
                <Link className="Logo" to= "/" >
                    <img alt="Petree's Prints" className="Image" src={logo} />
                    <span className="Brand">Petree's Prints</span>
                </Link>
                <nav>
                    <NavLink activeClassName="active" exact to="/">Order</NavLink>
                    <NavLink activeClassName="active" exact to="/about">About</NavLink>
                    <NavLink activeClassName="active" exact to="/faq">FAQ</NavLink>
                    <NavLink activeClassName="active" exact to="/contact">Contact</NavLink>
                </nav>
                <div className="Container">
                    <Route exact path={this.props.match.path} component={OrderForm}/>
                    <Route exact path={`${this.props.match.path}about`} component={About}/>
                    <Route exact path={`${this.props.match.path}faq`} component={FAQ}/>
                    <Route exact path={`${this.props.match.path}contact`} component={Contact}/>
                    <Route exact path={`${this.props.match.path}success`} component={Success}/>
                </div>
            </div>
        );
    }
}

export default withGlobalState(OrdersRouter);