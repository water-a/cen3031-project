import React, { Component } from 'react';

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
    }
    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Settings</h4>
                </div>
                <div className="card-body">
                    [Work in progress]
                </div>
            </div>
        );
    }
}

export default Settings;