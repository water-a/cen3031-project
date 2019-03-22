import React from 'react';
import { Route, Link } from 'react-router-dom';

import { Image } from 'office-ui-fabric-react/lib/Image';

import logo from '../img/logo.png';
import { OrderForm, Help, Dashboard, About } from '../pages';

const OrdersRouter = (props) => (
    <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <Link to= "/" >
            <Image src={logo} height="400px" width="500px" /> 
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>
        <Route exact path={props.match.path} component={OrderForm}/>
        <Route exact path={`${props.match.path}about`} component={About}/>
        <Route exact path={`${props.match.path}help`} component={Help}/>
    </div>
);

export default OrdersRouter;