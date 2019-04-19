import React from 'react';
import { Route, Link } from 'react-router-dom';
import Orders from '../../pages/Orders';
import Messages from '../../pages/Messages';
import Settings from '../../pages/Settings';
import logo from '../../img/logo.png';
import './DashboardRouter.css';

const DashboardRouter = (props) => (
    <div className="wrapper">
        <div className="sidebar">
            <div className="logo">
                <Link to="/dashboard" className="simple-text logo-normal">
                    <img alt="Petree's Prints" height="35" width="35" src={logo} />
                    Petree's Prints
                </Link>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li><Link to="/dashboard"><i className="now-ui-icons design_bullet-list-67"></i>Orders</Link></li>
                    <li><Link to="/dashboard/messages"><i className="now-ui-icons ui-2_chat-round"></i>Messages</Link></li>
                    <li><Link to="/dashboard/settings"><i className="now-ui-icons loader_gear"></i>Settings</Link></li>
                </ul>
            </div>
        </div>
        <div className="main-panel">
            <div className="content">
                <Route exact path={props.match.path} component={Orders} />
                <Route exact path={`${props.match.path}messages`} component={Messages} />
                <Route exact path={`${props.match.path}settings`} component={Settings} />
            </div>
        </div>
    </div>
);

export default DashboardRouter;