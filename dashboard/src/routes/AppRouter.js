import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DashboardRouter from './DashboardRouter/index.js';

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path='/dashboard/' component={DashboardRouter}/>
        </Switch>
    </Router>
);
export default AppRouter;