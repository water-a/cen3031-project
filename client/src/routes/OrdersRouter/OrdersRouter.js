import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

import './OrdersRouter.css';
import logo from '../../img/logo.png';
import { OrderForm, Help, Dashboard, About } from '../../pages';


const OrdersRouter = (props) => (
    <div className="Application">
        <Link className="Logo" to= "/" >
            <img className="Image" src={logo} />
            <span className="Brand">Petree's Prints</span>
        </Link>
        <nav>
            <NavLink activeClassName="active" exact to="/">Order</NavLink>
            <NavLink activeClassName="active" exact to="/about">About</NavLink>
            <NavLink activeClassName="active" exact to="/help">Help</NavLink>
        </nav>
        <div className="Container">
            <Route exact path={props.match.path} component={OrderForm}/>
            <Route exact path={`${props.match.path}about`} component={About}/>
            <Route exact path={`${props.match.path}help`} component={Help}/>
        </div>
    </div>
);

export default OrdersRouter;