import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrdersRouter from './OrdersRouter';

const AppRouter = () => (
    <Router>
        <Route path='/' component={OrdersRouter}/>
    </Router>
);
export default AppRouter;