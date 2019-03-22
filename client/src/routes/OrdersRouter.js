import React from 'react';
import { Route } from 'react-router-dom';

import { Image } from 'office-ui-fabric-react/lib/Image';

import logo from '../img/logo.png';
import OrderForm from '../pages/OrderForm';
import Help from '../pages/Help';

const OrdersRouter = (props) => (
    <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <Image src={logo} height="400px" width="500px" />      
        <Route exact path={props.match.path} component={OrderForm}/>
        <Route exact path={`${props.match.path}help`} component={Help}/>
    </div>
);

export default OrdersRouter;